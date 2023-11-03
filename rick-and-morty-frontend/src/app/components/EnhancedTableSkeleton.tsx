"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Skeleton,
} from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHeader";

function EnhancedTableSkeleton() {
  return (
    <TableContainer sx={{ maxHeight: 500 }}>
      <Table stickyHeader aria-label="sticky table">
        <EnhancedTableHead
          order="asc"
          orderBy="name"
          onRequestSort={() => {}}
          rowCount={20}
        />
        <TableBody>
          {[...Array(20)].map((_, index) => (
            <TableRow key={index}>
              <TableCell></TableCell>
              {[...Array(5)].map((_, cellIndex) => (
                <TableCell key={cellIndex}>
                  <Skeleton
                    width={cellIndex === 4 ? 50 : undefined}
                    height={cellIndex === 4 ? 50 : undefined}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EnhancedTableSkeleton;