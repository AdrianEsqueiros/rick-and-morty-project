"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
  Button,
  TableRow,
  TableCell,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { Result, Info, Order } from "../types";
import CharacterModal from "./CharacterModal";

import EnhancedTableHead from "./EnhancedTableHeader";
import EnhancedTableSkeleton from "./EnhancedTableSkeleton";
import EnhancedTableRow from "./EnhancedTableRow";
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  return b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0;
}

function getComparator<Key extends keyof Result>(
  order: Order,
  orderBy: Key
): (a: Result, b: Result) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
export default function EnhancedTable() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Result>("name");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [rowsPerPage] = useState(20);
  const [pagination, setPagination] = useState<Info | null>(null);
  const [characters, setCharacters] = useState<Result[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlyHumans, setShowOnlyHumans] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Result | null>();
  const [searchQuery, setSearchQuery] = useState("");
  const filterCharactersByName = (characters: Result[], query: string) => {
    if (!query) {
      return characters; // Return all characters if the search query is empty
    }
    query = query.toLowerCase();
    return characters.filter((character) =>
      character.name.toLowerCase().includes(query)
    );
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Result
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const openModal = (character: Result) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLoadingNextPage(true);
    axios
      .post("http://localhost:4000/graphql", {
        query: `
          query GetCharacters($page: Int) {
            characters(page: $page) {
              info {
                count
                pages
                next
              }
              results {
                id
                name
                status
                species
                type
                gender
                origin {
                  name
                  url
                }
                location {
                  name
                  url
                }
                image
                episode
                url
              }
            }
          }
        `,
        variables: {
          page: currentPage,
        },
      })
      .then((response) => {
        const data = response.data.data;
        if (data) {
          setCharacters(data.characters.results);
          setPagination(data.characters.info);
          setLoading(false);
          setLoadingNextPage(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setLoadingNextPage(false);
      });
  }, [currentPage]);

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows = Math.max(0, currentPage * rowsPerPage - characters.length);

  const filterHumanCharacters = useMemo(
    () => characters.filter((character) => character.species === "Human"),
    [characters]
  );

  const allVisibleRows = useMemo(() => {
    const sortedCharacters = stableSort(
      [...characters],
      getComparator(order, orderBy)
    );

    if (showOnlyHumans) {
      const sortedHumanCharacters = stableSort(
        filterHumanCharacters,
        getComparator(order, orderBy)
      );
      return sortedHumanCharacters;
    }

    return sortedCharacters;
  }, [characters, order, orderBy, showOnlyHumans, filterHumanCharacters]);
  const filteredCharacters = filterCharactersByName(
    allVisibleRows,
    searchQuery
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Button
      sx={{ margin: "10px" }}
        onClick={() =>
          setShowOnlyHumans((prevShowOnlyHumans) => !prevShowOnlyHumans)
        }
      >
        Find Human Characters
      </Button>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {loading || loadingNextPage ? (
          <EnhancedTableSkeleton />
        ) : (
          <TableContainer sx={{ maxHeight: 600, overflowX: "auto" }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={characters.length}
              />
              <TableBody>
                {filteredCharacters.map((item) => (
                  <EnhancedTableRow
                    key={item.id}
                    character={item}
                    isSelected={isSelected(item.id)}
                    onClick={() => openModal(item)}
                  />
                ))}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {loadingNextPage ? (
          <Skeleton />
        ) : (
          <TablePagination
            rowsPerPageOptions={[20]}
            component="div"
            count={pagination?.count || 0}
            rowsPerPage={rowsPerPage}
            page={currentPage - 1}
            onPageChange={(_, newPage) => setCurrentPage(newPage + 1)}
          />
        )}
      </Paper>
      {isModalOpen && selectedCharacter && (
        <CharacterModal character={selectedCharacter} onClose={closeModal} />
      )}
    </Box>
  );
}
