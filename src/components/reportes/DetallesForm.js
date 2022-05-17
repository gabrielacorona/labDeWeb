import React, { useEffect, useState, useCallback } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormReporte from "./FormReporte";
import { useParams } from "react-router";
import { getReportesByID } from "../../services/reportes";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function DetallesForm() {
  const [reporteData, setReporteData] = React.useState();
  let { reporteId } = useParams();
  const navigate = useNavigate();

  const fetchReporteData = useCallback(async () => {
    const op = await getReportesByID(reporteId);
    setReporteData(op);
  }, []);

  useEffect(() => {
    fetchReporteData().catch(console.error);
  }, []);

  return (
    reporteData && (
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
            <React.Fragment>
              <Box
                sx={{ display: "flex", justify: "normal", flexGrow: 1 }}
              >
                <FormReporte reporteData={reporteData} isStatic={true} />
              </Box>
            </React.Fragment>
          </Container>
        </Box>
      </ThemeProvider>
    )
  );
}
