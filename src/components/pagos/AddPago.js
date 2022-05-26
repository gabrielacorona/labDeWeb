import React, {useEffect, useState, useCallback} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormPago from "./FormPago";
import { useNavigate } from 'react-router-dom';
import { addPagoToUser, postPago } from '../../services/pagos';

const theme = createTheme();

export default function AddPago() {
    const navigate = useNavigate();
    const [company, setCompany] = useState('');

    const handleSubmit = async e => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      let pago = {
        id: data.get('id'),
        fecha: data.get('fecha'),
        ultimoPago: data.get('ultimoPago'),
        cobroPorMes: data.get('cobroPorMes'),
        dirFactura: data.get('dirFactura'),
        deuda: data.get('deuda'),
        cliente: company
      }
      const res = await postPago(pago)
      const res2 = await addPagoToUser({userId: company, pagoId: res.id})
      console.log(res2)
      navigate('/listapagos');
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
        <Container maxWidth="lg" sx={{ pt: 4, pb: 4, height: "100%", display: "flex", flexDirection: "column" }}>
          <Typography component="h1" variant="h4" align="left">
            Agregar nuevo pago
          </Typography>
          <React.Fragment>
            <Box
              component="form"
              sx={{ display: "flex", justifyContent: "normal", flexGrow: 1 }}
              onSubmit={handleSubmit}
            >
              <FormPago company={company} setCompany={setCompany} />
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
