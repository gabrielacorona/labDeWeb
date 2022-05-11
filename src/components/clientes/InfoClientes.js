import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DetallesCliente from "./DetallesCliente";
import { useParams } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const themeMain = createTheme();

const mockProp = {
  clientes: [
      {
          id: "1",
          nombre: "Andres",
          apellido: "Genda",
          email: "Agenda@gmail.com",
          password: "abc123",
          compania: "ITESM",
          celular: 7821707449,
          numOperadores: 3,
          numReportes: 3,
          ultimoPago: "20/03/2022",
          deuda: "11000"

      },
      {
          id: "2",
          nombre: "jc",
          apellido: "del castillo",
          email: "jc123@gmail.com",
          password: "123abc",
          compania: "Tec",
          celular: 7821707448,
          numOperadores: 2,
          numReportes: 2,
          ultimoPago: "20/04/2022",
          deuda: "13000"

      },
  ]    
}

// Reemplazar esta función con la llamada de backend
function fetchData(id, setClientData){
  const cliente = mockProp.clientes.filter(cliente => cliente.id === id)[0];
  setClientData(cliente);
}

export default function InfoClientes() {
  const [clientData, setClientData] = React.useState({});
  
  const clientID = useParams().id;

  React.useEffect(() => {
    fetchData(clientID, setClientData);
  }, []);
  return (
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
            Información Cliente
          </Typography>
          <React.Fragment>
            <Box
              component="form"
              sx={{ display: "flex", justifyContent: "normal", flexGrow: 1 }}
            >
              <DetallesCliente
                clientData={clientData}
              />

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
  );
}
