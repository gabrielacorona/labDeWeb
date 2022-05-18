import React, {useEffect, useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Title from '../utils/Title';
import Typography from '@mui/material/Typography';

const mockProp = {
    id : "1234567",
    fecha : "12 de agosto de 2022",
    ultimoPago : "14 de abril de 2022",
    cobroPorMes : 1000000,
    dirFactura : "Nuevo Sur",
    deuda : 20000,
    cliente : "Andres"
}

function SpecsWrapper(props){
    return (
        <React.Fragment>
            <Grid item xs={12} md={6} lg={4}>
                <div style={{marginLeft: 24}}>
                    <Typography component="h6" variant="h6" gutterBottom>
                        {props.title}
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <div style={{marginLeft: 24}}>
                    <Typography component="body1" variant="body1" gutterBottom>
                        {props.descripcion}
                    </Typography>
                </div>
            </Grid>
        </React.Fragment>
    )
}

export default function DetallePago() {
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
        }} >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Title>Pago 1</Title>
                </Grid>
                <SpecsWrapper title="ID del pago" descripcion={mockProp.id} />
                <SpecsWrapper title="Fecha" descripcion={mockProp.fecha} />
                <SpecsWrapper title="Ultimo pago" descripcion={mockProp.ultimoPago} />
                <SpecsWrapper title="Cobro por mes" descripcion={mockProp.cobroPorMes} />
                <SpecsWrapper title="Direccion de factura" descripcion={mockProp.dirFactura} />
                <SpecsWrapper title="Deuda a la fecha" descripcion={mockProp.deuda} />
                <SpecsWrapper title="Cliente" descripcion={mockProp.cliente} />
            </Grid>
        </Container>
    </Box>
);
}