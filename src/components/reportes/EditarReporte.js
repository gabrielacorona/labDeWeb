import React, {useEffect, useState, useCallback} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormReporte from "./FormReporte";
import { useParams } from "react-router";
import { getReportesByID, editReporte } from "../../services/reportes";
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function EditarReporte() {
  const [reporteData, setReporteData] = React.useState();
  let { reporteId } = useParams();
  const navigate = useNavigate();

  const fetchReporteData = useCallback(async () => {
    const op = await getReportesByID(reporteId)
    //console.log(op)
    setReporteData(op);
  }, [])

  useEffect(() => {
    fetchReporteData()
    .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let operador = {
      id: reporteId,
      titulo: data.get('titulo'),
      fecha: data.get('fecha'),
      diagnostico: data.get('diagnostico'),
      costoEstimado: data.get('costo-estimado'),
      descripcion: data.get('descripcion'),
    }

    const resEdit = await editReporte(operador)
    navigate('/inforeportes/'+ reporteId);
  };

  return (
    reporteData &&
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
          <React.Fragment>
            <Box
              component="form"
              sx={{ display: "flex", justifyContent: "normal", flexGrow: 1 }}
              onSubmit={handleSubmit}
            >
              <FormReporte reporteData={reporteData} isEditing={true} />
              <ThemeProvider theme={theme}>
                <Box sx={{ flexDirection: "column", display: "flex", pt: 2 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    sx={{ mb: 2 }}
                  >
                    Guardar
                  </Button>
                  </Box>
                  </ThemeProvider>
            </Box>
          </React.Fragment>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
