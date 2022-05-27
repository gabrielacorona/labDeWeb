import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Title from '../utils/Title'
import DetailCard  from './DetailCard';
import { getMoldes, getMoldesByCompany } from '../../services/moldes';
import { getUserById, useUserId, getUserMoldes } from '../../services/users';
import NewMoldeCard from './NewMoldeCard';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import MoldesFilter from './MoldesFilter';

const mockProp = {
    moldes: [
        {nombre: "molde1", id: "abc"},
        {nombre: "molde2", id: "def"},
        {nombre: "molde3", id: "ghi"},
    ]
}

export default function MoldesAdmin() {
    var clienteid = new URLSearchParams(location.search).get("clienteid")

    const [moldes, setMoldes] = useState([]);
    const [user, setUser] = useState('');
    const [filter, setFilter] = useState(clienteid ? clienteid : 'Todos');

    const fetchMoldeData = (async () => {
        if(filter != 'Todos'){
            const userData = await getUserById(filter)
            setUser(userData)
            const userMoldes = await getMoldesByCompany(userData.company)
            setMoldes(userMoldes);
        } else{
            const moldes = await getMoldes()
            setMoldes(moldes);
        }
    })

    useEffect(() => {
        fetchMoldeData()
        .catch(console.error);
    }, [filter]);

    return (
        moldes &&
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
                        <Title>Moldes </Title>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                        <MoldesFilter filter={filter} setFilter={setFilter}/>
                    </Grid>
                    <Grid item xs={8} md={8} lg={8} />

                    {moldes && moldes.map(({ id, nombreMolde}, index) => (
                        <DetailCard idMolde={id} nombreMolde={nombreMolde} cardNumber={index + 1}/>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
