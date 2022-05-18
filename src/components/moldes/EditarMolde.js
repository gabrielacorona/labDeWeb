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
import Title from '../utils/Title';
import { useParams } from "react-router";
import { getMoldeById, editMolde } from '../../services/moldes';
import { getUserById, getUserId } from '../../services/users';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const editingStatus = true;

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
  
export default function EditarMolde() {

  const [mockProp, setMockProp] = useState();
  const [age, setAge] = useState('');

  let { id } = useParams();
  const navigate = useNavigate();

  const fetchMoldeData = useCallback(async () => {
      const moldeData = await getMoldeById(id)

      setMockProp(moldeData);
  }, [])

  useEffect(() => {
      fetchMoldeData()
      .catch(console.error);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const objID = await getUserById(getUserId())

    let molde = {
      id: id,
      nombreMolde: data.get('nombreMolde'),
      fechaAdquisicion: data.get('fechaAdquisicion'),
      tipoColada: data.get('tipoColada'),
      descripcion: data.get('descripcion'),
      costo: data.get('costo'),
      ultimaReparacion: data.get('reparacion'),
      encargado: age
    }
    let res = await editMolde(molde)
    navigate('/detallemolde/' + id);
  }

  return (
      mockProp &&
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
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Title>Editar molde</Title>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Box component="form" sx={{ display: 'flex', justifyContent: 'normal' }} onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <AddMoldesForm mock={mockProp} id={getUserId()} editing={editingStatus} age={age} setAge={setAge}/>
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