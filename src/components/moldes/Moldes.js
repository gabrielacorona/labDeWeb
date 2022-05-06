import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Title from '../utils/Title'
import DetailCard  from './DetailCard';

const mockProp = {
    moldes: [
        {nombre: "molde1", id: "abc"},
        {nombre: "molde2", id: "def"},
        {nombre: "molde3", id: "ghi"},
    ]
}

const makeAPICall = async () => {
    var config = {
        method: 'get',
        url: '/moldes',
        headers: { 
            'Content-Type': 'application/json'
        }
    };
    axios(config)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error
    });
}

export default function Moldes() {
    const [moldes, setMoldes] = useState([]);

    useEffect(() => {
        var config = {
            method: 'get',
            url: '/moldes',
            headers: { 
                'Content-Type': 'application/json'
            }
        };
        axios(config)
        .then(function (response) {
            setMoldes(response.data);
        })
        .catch(function (error) {
            // TODO - error handling
            return error
        });
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
                    <Title>Moldes </Title>
                </Grid>
                {moldes && moldes.map(({ id}, index) => (
                    <DetailCard idMolde={id} cardNumber={index + 1}/>
                ))}
            </Grid>
        </Container>
    </Box>
);
}