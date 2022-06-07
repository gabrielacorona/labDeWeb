import React, {useEffect, useState, useCallback} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddMoldesForm from './AddMoldesForm';
import Descripcion from '../reportes/Descripcion';
import { postReporte } from '../../services/reportes';
import ButtonAddImage from '../utils/ButtonAddImage';
import { getUserById, getUserId } from '../../services/users';
import { addMoldeToUser, postMolde } from '../../services/moldes';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";

const theme = createTheme();

const editingStatus = false;
  
export default function AgregarMolde(props) {
  const [moldeData, setMoldeData] = React.useState({});
  const [age, setAge] = useState('');
  const [company, setCompany] = useState('');
  let userId = useParams().id;
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const picture = document.getElementById("addImage")
    let file = picture.files[0]
    const imgDescription = document.getElementById("imageDesc")

    const fd = new FormData();
    fd.append('nombreMolde',data.get('nombreMolde'))
    fd.append('fechaAdquisicion',data.get('fechaAdquisicion'))
    fd.append('tipoColada',data.get('tipoColada'))
    fd.append('descripcion',data.get('descripcion'))
    fd.append('costo',data.get('costo'))
    fd.append('ultimaReparacion',data.get('reparacion'))
    fd.append('ultimoReporte',"NA")
    fd.append('encargado',age)
    fd.append('image', file)
    fd.append('fotoDescription', imgDescription.value)


    const res = await postMolde(fd)
    const resmolde = await addMoldeToUser({userId: userId, moldeId: res.id})
    navigate('/moldes');
  }

  return (
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
                Nuevo Molde
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={9} lg={9}>
                    <Box component="form" sx={{ display: 'flex', justifyContent: 'normal' }} onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <AddMoldesForm editing={editingStatus} id={userId} age={age} setAge={setAge} company={company} setCompany={setCompany}/>
                            <Grid item xs={12} md={12} lg={12}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                >
                                    Guardar Molde
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
    </ThemeProvider>
);
}