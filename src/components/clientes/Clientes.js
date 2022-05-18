import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Title from '../utils/Title'
import { getMoldes } from '../../services/moldes';
import { getClients } from '../../services/users';
import { Link } from 'react-router-dom';
import ClienteCard from './ClienteCard'
import NewClienteCard from './NewClienteCard';

const mockProp = {
    clientes: [
        {firstName: "Andres", lastName: "Corona", id: "abc"},
        {firstName: "Juan", lastName: "Martinez", id: "def"}
    ]
}
  
export default function Clientes() {
    const [clientes, setClientes] = useState();

    const fetchClienteData = useCallback(async () => {
        const clientesData = await getClients()
        setClientes(clientesData);
      }, [])

    useEffect(() => {
        fetchClienteData()
        .catch(console.error);
    }, []);

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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Title>Clientes </Title>
                    </Grid>
                    {clientes && clientes.map(({ id, firstName, lastName }, index) => (
                        <ClienteCard id={id} firstName={firstName} lastName={lastName}/>
                    ))}
                    <NewClienteCard/>
                </Grid>
            </Container>
        </Box>
    );
}