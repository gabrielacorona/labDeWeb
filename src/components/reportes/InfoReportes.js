import React, { useEffect, useState, useCallback } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DetallesForm from "./DetallesForm";
import Descripcion from "./Descripcion";
import { postReporte, getReportesByID } from "../../services/reportes";
import { getUserId } from "../../services/users";
import { useParams } from "react-router";

const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
    },
  });

const themeMain = createTheme();

export default function InfoReportes() {
  const [reporteData, setReporteData] = React.useState();
  let { reporteId } = useParams();

  const fetchReporteData = useCallback(async () => {
    const reporteData = await getReportesByID(reporteId);

    setReporteData(reporteData);
  }, []);

  useEffect(() => {
    fetchReporteData().catch(console.error);
  }, []);

  return (
    reporteData && (
      <ThemeProvider theme={themeMain}>
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
            overflow: "auto"
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              pt: 4,
              pb: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Typography component="h1" variant="h4" align="left">
              Reporte
            </Typography>
            <React.Fragment>
              <Box
                component="form"
                sx={{ display: "flex", justifyContent: "normal", flexGrow: 1, width: '100%'   }}
              >
                <DetallesForm isStatic={true} data={reporteData} />
                <ThemeProvider theme={theme}>
                  <Box sx={{ flexDirection: "column", display: "flex", pt: 2 }}>
                    <Button
                      color="primary"
                      variant="outlined"
                      type="submit"
                      sx={{ mb: 2 }}
                    >
                      Editar
                    </Button>
                    <Button color="error" variant="outlined" type="submit">
                      Eliminar
                    </Button>
                  </Box>
                </ThemeProvider>
              </Box>
            </React.Fragment>
          </Container>
        </Box>
      </ThemeProvider>
    )
  );
}
