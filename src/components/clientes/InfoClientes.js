import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DetallesCliente from "./DetallesCliente";
import { postReporte } from "../../services/reportes";

const theme = createTheme();

export default function InfoClientes() {
  const [reporteData, setReporteData] = React.useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let reporte = {
      titulo: data.get("titulo"),
      fecha: data.get("fecha"),
      autor: data.get("autor"),
      diagnostico: data.get("diagnostico"),
      costoEstimado: data.get("costo-estimado"),
      descripcion: data.get("descripcion"),
    };
    const res = await postReporte(reporte);
    console.log(res);
  };

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
        <Container maxWidth="lg" sx={{ pt: 4, pb: 4, height: "100%", display: "flex", flexDirection: "column" }}>
          <Typography component="h1" variant="h4" align="left">
            Información Cliente
          </Typography>
          <React.Fragment>
            <Box
              component="form"
              sx={{ display: "flex", justifyContent: "normal", flexGrow: 1 }}
              onSubmit={handleSubmit}
            >
              <DetallesCliente />
            </Box>
          </React.Fragment>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
