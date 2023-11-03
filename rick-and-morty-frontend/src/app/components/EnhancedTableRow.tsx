import React from "react";
import { TableCell, TableRow } from "@mui/material";
import Image from "next/image";
import { Result } from "../types";

interface EnhancedTableRowProps {
  character: Result;
  isSelected: boolean;
  onClick: () => void;
}

const EnhancedTableRow: React.FC<EnhancedTableRowProps> = ({
  onClick,
  character,
  isSelected,
}) => {
  const labelId = `enhanced-table-checkbox-${character.name}`;

  return (
    <TableRow
      onClick={onClick}
      key={character.id}
      hover
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      selected={isSelected}
      sx={{
        cursor: "pointer",
        "@media (max-width: 600px)": {
          flexDirection: "column", // Change to column layout on small screens
        },
      }}
    >
      <TableCell padding="checkbox"></TableCell>
      <TableCell component="th" id={labelId} scope="character" padding="none">
        {character.name}
      </TableCell>
      <TableCell
        align="left"
        sx={{ color: character.status === "Dead" ? "red" : character.status === "unknown"?"gray":"green" }} // Cambia "green" al color que desees
        >
        {character.status}
      </TableCell>
      <TableCell align="left"
              sx={{ color: character.species === "Human" ? "black" :"gray" }} // Cambia "green" al color que desees
              >{character.species}</TableCell>
      <TableCell align="left">{character.gender}</TableCell>
      <TableCell align="left">
        <Image src={character?.image} alt={character.name} width={50} height={50} />
      </TableCell>
    </TableRow>
  );
};

export default EnhancedTableRow;
