import React, {useEffect, useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Title from '../utils/Title';
import Typography from '@mui/material/Typography';
import { getPagoById } from '../../services/pagos';
import { useParams } from "react-router";
import { getUserByMongoId } from '../../services/users';

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
                    <Typography component="h2" variant="body1" gutterBottom>
                        {props.descripcion}
                    </Typography>
                </div>
            </Grid>
        </React.Fragment>
    )
}

export default function DetallePago() {
    const [mockProp, setMockProp] = useState({});
    const [cliente, setCliente] = useState()

    let { id } = useParams();

    const fetchPagoData = useCallback(async () => {
        const data = await getPagoById(id)
        let clienteData = await getUserByMongoId(data.cliente)
        setMockProp(data);
        setCliente(clienteData)
    }, [])

    useEffect(() => {
        fetchPagoData()
        .catch(console.error);
    }, []);


  return (
      mockProp && cliente &&
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
                <SpecsWrapper title="Cliente" descripcion={cliente.firstName + ' ' + cliente.lastName} />
            </Grid>
        </Container>
    </Box>
);
}