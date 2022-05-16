import React, {useEffect, useState, useCallback} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormCliente from "./FormCliente";
import { editUser, getUserById } from "../../services/users";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';

// import { postCliente } from "../../services/clientes";

const theme = createTheme();

export default function EditarCliente() {
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
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let cliente = {
      id: clientID,
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      company: data.get('company'),
      telephone: data.get('telephone'),
    }
    const resEdit = await editUser(cliente)
    console.log(resEdit)
    navigate('/infoclientes/'+clientID);
  }

return (
  clientData &&
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
            Editar Cliente
          </Typography>
          <React.Fragment>
            <Box
              component="form"
              sx={{ display: "flex", justifyContent: "normal", flexGrow: 1 }}
              onSubmit={handleSubmit}
            >
              <FormCliente clienteData={clientData} isEditing={true} />
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
