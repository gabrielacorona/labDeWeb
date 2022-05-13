import React, {useEffect, useState, useCallback} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DetallesForm from './DetallesForm';
import Descripcion from './Descripcion';
import { postReporte, getReportesByID } from '../../services/reportes';
import { getUserId } from '../../services/users';
import { useParams } from "react-router";

const theme = createTheme();
  
export default function InfoReportes() {
  const [reporteData, setReporteData] = React.useState();
  let { reporteId } = useParams();
  
  const fetchReporteData = useCallback(async () => {
      const reporteData = await getReportesByID(reporteId)

      setReporteData(reporteData);
  }, [])

  useEffect(() => {
    fetchReporteData()
      .catch(console.error);
  }, []);

  return (
      reporteData &&
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
        component="main"
        sx={{
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        }}
    >
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Typography component="h1" variant="h4" align="left">
                Reporte
            </Typography>
                <React.Fragment>
                <Box component="form" sx={{ display: 'flex', justifyContent: 'normal' }}>
                <Grid container spacing={3}>
                        <DetallesForm isStatic={true} data={reporteData}/>
                    </Grid>
                </Box>
                </React.Fragment>
        </Container>
    </Box>
    </ThemeProvider>
);
}