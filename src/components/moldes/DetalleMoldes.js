import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Content from '../Content';
import ButtonDetalleMolde from '../utils/ButtonDetalleMolde';
import Title from '../utils/Title';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
        <Title>{props.title}</Title>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
        {props.descripcion}
        </Typography>
    </div>
    );
}

function SpecsWrapper(props){
    return (
        <div style={{paddingLeft: 10}}>
            <SpecsMolde title="Fecha de adquisición" descripcion={mockProp.fechaAdquisicion}/>    
            <SpecsMolde title="Encargado" descripcion={mockProp.encargado} />
            <SpecsMolde title="Tipo de Colada" descripcion={mockProp.tipoColada}/>
        </div>
    )
}

export default function DetallesMoldes() {
  return (
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
        {/* CONTAINER WITH DESCRIPCION AND FOTOS AND REPORTES BUTTONS */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={9} lg={9}>
                    <Title>{mockProp.nombreMolde}</Title>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography>ID: {mockProp.id}</Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Button variant="outlined" style={{width: "100%"}}>Editar</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 300,
                    }}
                    >
                    <Content title="Descripcion"/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={12} lg={12}>
                            <ButtonDetalleMolde title="Fotos"/>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <ButtonDetalleMolde title="Reportes"/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <SpecsWrapper />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Button variant="contained" style={{width: "100%", height:"25%"}}>Agregar Molde</Button>
                </Grid>        
            </Grid>
        </Container>
    </Box>
);
}