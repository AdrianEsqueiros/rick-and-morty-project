import React from "react";
import { Result } from "../types";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface CharacterModalProps {
  character: Result;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
}) => {
  if (!character) {
    return null;
  }

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent
              sx={{
                flex: "1 0 auto",
                backgroundColor: "#fff",
                "@media (max-width: 600px)": {
                  fontSize: "14px", // Ajusta el tamaño de fuente para pantallas pequeñas
                  // Otros ajustes necesarios
                },
              }}
            >
              <Typography variant="h5" component="div">
                {character.name}
              </Typography>
              <Typography
                variant="body2"
                color={
                  character.species === "Human"
                    ? "text.primary"
                    : "text.secondary"
                }
              >
                Species: <strong>{character.species}</strong>
              </Typography>
              <Typography
                variant="body2"
                color={character.status === "Dead" ? "red" : "text.secondary"}
              >
                Status: <strong>{character.status}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gender: {character.gender}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location: {character.location.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Origin: {character.origin.name}
              </Typography>
            </CardContent>
          </Box>

          <CardMedia
            component="img"
            alt={character.name}
            height="auto"
            sx={{
              width: "100%",
              maxWidth: "100%", // Asegura que la imagen se redimensione correctamente
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            image={character.image}
            title={character.name}
          />
        </Card>
      </Box>
    </Modal>
  );
};

export default CharacterModal;
