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

const mockProp = {
    moldes: [
        {nombre: "molde1", id: "abc"},
        {nombre: "molde2", id: "def"},
        {nombre: "molde3", id: "ghi"},
    ]
}
// http://localhost:3000/moldesadmin?clienteid=86a357f6-085f-4c2f-8c70-f616af4af992
export default function Moldes() {
    const [moldes, setMoldes] = useState([]);
    const [user, setUser] = useState('');
    let id = useParams().id
    let {userId} = id ? id : useUserId()

    const fetchMoldeData = useCallback(async () => {
        const userData = await getUserById(userId)
        setUser(userData)
        const userMoldes = await getMoldesByCompany(userData.company)
        setMoldes(userMoldes);
    }, [])

    useEffect(() => {
        fetchMoldeData()
        .catch(console.error);
    }, []);

    return (
        user &&
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
                    {moldes && moldes.map(({ id, nombreMolde}, index) => (
                    <DetailCard idMolde={id} nombreMolde={nombreMolde} cardNumber={index + 1}/>
                    ))}
                    {user.userType != 'o' &&
                        <NewMoldeCard id={userId}/>
                    }
                </Grid>
            </Container>
        </Box>
    );
}
