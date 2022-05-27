import React, {useEffect, useState, useCallback} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormOperador from "./FormOperador";
import { useParams } from "react-router";
import { getUserById, editUser } from "../../services/users";
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function EditarOperador() {
  const [operatorData, setOperatorData] = React.useState();
  let { id } = useParams();
  const navigate = useNavigate();

  const fetchOperadorData = useCallback(async () => {
    const op = await getUserById(id)
    setOperatorData(op);
  }, [])

  useEffect(() => {
    fetchOperadorData()
    .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let operador = {
      id: id,
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      telephone: data.get('telephone')
    }

    const resEdit = await editUser(operador)
    navigate('/infooperador/'+id);
  };

  return (
    operatorData &&
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
            Editar Operador
          </Typography>
          <React.Fragment>
            <Box
              component="form"
              sx={{ display: "flex", justifyContent: "normal", flexGrow: 1 }}
              onSubmit={handleSubmit}
            >
              <FormOperador operatorData={operatorData} isEditing={true} />
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
