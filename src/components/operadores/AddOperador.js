import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormOperador from "./FormOperador";
import { addOperador, getUserId, getUserById, registerUser} from "../../services/users";
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function AddOperador() {
    const [operador, setOperador] = React.useState({});
    const navigate = useNavigate();
    const userId = getUserId()

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
    const handleSubmit = async e => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const userData = await getUserById(getUserId())
      
      const picture = document.getElementById("addImage")
      let file = picture.files[0]

      const fd = new FormData();
      fd.append('firstName', data.get('firstName'))
      fd.append('lastName', data.get('lastName'))
      fd.append('email', data.get('email'))
      fd.append('company', userData.company)
      fd.append('telephone', data.get('telephone'))
      fd.append('password', data.get('firstName') + userData.company)
      fd.append('image', file)
      fd.append('fotoDescription', 'userpict')
      fd.append('userPicture', 'NA')
      fd.append('companyPicture', 'NA')
      fd.append('lastReportDate', 'NA')
      fd.append('memberSince', "fecha")
      fd.append('userType', 'o')
      console.log(fd.get('firstName'))

      const resRegister = await registerUser(fd)
      console.log(resRegister, "reg")
      const resAddOp = await addOperador({operadorId: resRegister.id, userId: userId})
      navigate('/operadores');
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
            Agregar nuevo operador
          </Typography>
          <React.Fragment>
            <Box
              component="form"
              sx={{ display: "flex", justifyContent: "normal", flexGrow: 1 }}
              onSubmit={handleSubmit}
            >
              <FormOperador />
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
