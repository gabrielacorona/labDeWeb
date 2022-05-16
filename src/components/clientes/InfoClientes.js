import React, {useEffect, useState, useCallback} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { getUserById, deleteUser } from '../../services/users';
import FormCliente from './FormCliente';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import Title from '../utils/Title'

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const themeMain = createTheme();

export default function InfoClientes() {
  const [clientData, setClientData] = useState();
  
  const clientID = useParams().id;
  const navigate = useNavigate();

  const fetchClienteData = useCallback(async () => {
    const op = await getUserById(clientID)
    console.log(op)
    setClientData(op);
  }, [])

  useEffect(() => {
    fetchClienteData()
    .catch(console.error);
  }, []);

  const handleSubmit = async e => {
    navigate('/editarcliente/' + clientID);
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    let res = await deleteUser({id: clientID})
    navigate('/');
  };


return (
    clientData &&
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
              <FormCliente
                clienteData={clientData}
                isStatic={true}
              />

              <ThemeProvider theme={theme}>
                <Box sx={{ flexDirection: "column", display: "flex", pt: 2 }}>
                    <Button
                      color="primary"
                      variant="outlined"
                      type="submit"
                      sx={{ mb: 2 }}
                      onClick={handleSubmit}
                    >
                      Editar
                    </Button>
                  <Button color="error" variant="outlined" type="submit" onClick={handleDelete}>
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
