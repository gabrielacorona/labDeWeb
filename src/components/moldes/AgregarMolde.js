import * as React from 'react';
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

const theme = createTheme();

const editingStatus = false;

function RightSidebar(){
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12} lg={12}>
                <ButtonAddImage title="AGREGAR IMAGEN"/>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <ButtonAddImage title="AGREGAR REPORTE"/>
            </Grid>
        </Grid>
    );
}
  
export default function AgregarMolde() {
  const [moldeData, setMoldeData] = React.useState({});
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userId = getUserId()
    const objID = await getUserById(getUserId())
    let molde = {
      nombreMolde: data.get('nombreMolde'),
      fechaAdquisicion: data.get('fechaAdquisicion'),
      encargado: data.get('encargado'),
      tipoColada: data.get('tipoColada'),
      descripcion: data.get('descripcion'),
      costo: data.get('costo'),
      ultimaReparacion: data.get('reparacion'),
      ultimoReporte: "NA",
      encargado: objID._id
    }
    const res = await postMolde(molde)
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
                            <AddMoldesForm editing={editingStatus} />
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
                <Grid item xs={12} md={3} lg={3}>
                    <RightSidebar/>
                </Grid>
            </Grid>
        </Container>
    </Box>
    </ThemeProvider>
);
}