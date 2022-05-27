import React, { useEffect, useState, useCallback } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormReporte from "./FormReporte";
import Descripcion from "./Descripcion";
import { postReporte, addReporteToMolde } from "../../services/reportes";
import { useParams } from "react-router";
import { getUserId, getUserById } from "../../services/users";

const theme = createTheme();

export default function AddReporte(props) {
  const [submitted, setSumbitted] = useState(false);
  let { moldeId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userId = getUserId();
    const objID = await getUserById(getUserId());
    let reporteData = {
      titulo: data.get("titulo"),
      fecha: data.get("fecha"),
      autor: objID._id,
      diagnostico: data.get("diagnostico"),
      costoEstimado: data.get("costo-estimado"),
      descripcion: data.get("descripcion"),
    };
    const reporteId = await postReporte(reporteData);
    let obj = {
      reporteId: reporteId.id,
      moldeId: moldeId,
    };
    const res = await addReporteToMolde(obj);

    setSumbitted(true);
  };
  if (submitted) {
    return <h1>Exito!</h1>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            pt: 4,
            pb: 4,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography component="h1" variant="h4" align="left">
            Reporte
          </Typography>
          <React.Fragment>
            <Box
              component="form"
              sx={{ display: "flex", justifyContent: "normal" }}
              onSubmit={handleSubmit}
            >
              <FormReporte isEditing={false} />
              <Box sx={{ flexDirection: "column", display: "flex", pt: 2 }}>
                <Button variant="contained" type="submit">
                  Guardar
                </Button>
              </Box>
            </Box>
          </React.Fragment>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
