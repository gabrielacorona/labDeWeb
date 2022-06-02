import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormOperador from "./FormOperador";
import { addOperador, getUserId, getUserById, registerUser} from "../../services/users";
import { useNavigate } from 'react-router-dom';
import ButtonAddImage from "../utils/ButtonAddImage";
import { postFoto } from "../../services/fotos";
import axios from 'axios';

const theme = createTheme();

async function postImage(image, description) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)
  const result=""
  try{
    result = await axios.post('/fotos', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    
  }catch(err){
    console.log(err.message)
  }
  return result.data
}

export default function AddOperador() {
    const [operador, setOperador] = React.useState({});
    const navigate = useNavigate();
    const userId = getUserId()
    
    const handleSubmit = async e => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const userData = await getUserById(getUserId())
      let operador = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        company: userData.company,
        telephone: data.get('telephone'),
        password: "hola",
        userPicture: "NA",
        companyPicture: "NA",
        lastReportDate: "NA",
        memberSince: "12-01-2022",
        userType: "o",
        userPicture: data.get('')
      }
      const resRegister = await registerUser(operador)
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
            <Grid sx={{width:"20%"}}>
              <ButtonAddImage title="AGREGAR IMAGEN"/>
            </Grid>
          </React.Fragment>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
