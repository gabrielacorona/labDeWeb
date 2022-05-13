import React, {useEffect, useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonDetalleMolde from '../utils/ButtonDetalleMolde';
import Title from '../utils/Title';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getMoldeById } from '../../services/moldes';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const mockProp = {
    nombreMolde : "MOLDE SUPREME",
    id : "12345675992",
    fechaAdquisicion : "12-03-2022",
    descripcion : 'Este es un molde para hacer botellas',
    tipoColada : 'Muy',
    encargado : "Andres"
}

function SpecsMolde(props) {
    return (
    <div style={{marginLeft: 4, marginBottom: 15}}>
        <Typography component="h6" variant="h6" gutterBottom>
            {props.title}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
            {props.descripcion}
        </Typography>
    </div>
    );
}

function SpecsWrapper({fechaAdquisicion, encargado, tipoColada, idMolde}){
    // TODO - get encargado name
    return (
        <Grid item xs={12} md={12} lg={12}>
            <div style={{paddingLeft: 10}}>
                <SpecsMolde title="Fecha de adquisicion" descripcion={fechaAdquisicion}/>    
                <SpecsMolde title="Encargado" descripcion={encargado} />
                <SpecsMolde title="Tipo de Colada" descripcion={tipoColada}/>
                <SpecsMolde title="ID de Molde" descripcion={idMolde}/>
            </div>
        </Grid>
    )
}

function DescrMolde(props) {
    return (
        <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }} >
                <Typography component="h5" variant="h5" gutterBottom>
                    {props.title}
                </Typography>
                <Typography color="text.secondary">
                    {props.descripcion}
                </Typography>
            </Paper>
        </Grid>
    );
}

function TopHeader({id}){
    return(
        <Grid item xs={12} md={3} lg={3}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                    <Link to={'/editarmolde/'+ id}>
                        <Button variant="outlined" style={{width: "100%"}}>Editar</Button>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    )
}

function RightSidebar(props){
    return(
        <Grid item xs={12} md={3} lg={3}>
            <Grid container spacing={4}>
            <Grid item xs={12} md={12} lg={12}>
                    <Button variant="contained" style={{width: "100%", height:"100%"}} endIcon={<ArrowForwardIcon />}>Agregar Reporte</Button>
                </Grid> 
                <Grid item xs={12} md={12} lg={12}>
                    <ButtonDetalleMolde title="Fotos"/>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <ButtonDetalleMolde title="Reportes"/>
                </Grid>
            </Grid>
        </Grid>       
    )
}

export default function DetallesMoldes() {
    const [data, setData] = useState({});
    let { id } = useParams();
    console.log(id)
    
    const fetchMoldeData = useCallback(async () => {
        const moldeData = await getMoldeById(id)

        setData(moldeData);
    }, [])

    useEffect(() => {
        fetchMoldeData()
        .catch(console.error);
    }, []);

  return (
      data &&
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
        }} >
        {/* CONTAINER WITH DESCRIPCION AND FOTOS AND REPORTES BUTTONS */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={9} lg={9}>
                    <Title>{data.nombreMolde}</Title>
                </Grid>
                <TopHeader id={data.id} />
                <Grid item xs={12} md={9} lg={9}>
                    <Grid container spacing ={4}>
                        <DescrMolde title="Descripcion" descripcion={data.descripcion}/>
                        <SpecsWrapper fechaAdquisicion={data.fechaAdquisicion} encargado={mockProp.encargado} tipoColada={data.tipoColada} idMolde={data.id} />
                    </Grid>
                </Grid>
                <RightSidebar/>
            </Grid>
        </Container>
    </Box>
);
}