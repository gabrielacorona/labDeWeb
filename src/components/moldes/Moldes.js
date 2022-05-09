import React, {useEffect, useState, useCallback} from 'react';
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

async function getMoldes() {
    return fetch('/moldes', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJiNTgzMTBhLWU1ZjUtNGY4MS05ZmIwLWZlOTYxZjEyZmM2NSIsImZpcnN0TmFtZSI6InJpY2FyZG8iLCJsYXN0TmFtZSI6ImNvcm9uYSIsImVtYWlsIjoicmlja3lAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDUkWldNc0NwZEsvbVNrajJJN1BVd1lBLk84YUpoNExla1UxTXFpandBZ0ZvdTBUZHU2SkI5VVciLCJjb21wYW55IjoiZ2FiYWNvIiwidGVsZXBob25lIjoiODE4MjY2MjIwMyIsInVzZXJQaWN0dXJlIjoicGVuZGllbnRlIiwiY29tcGFueVBpY3R1cmUiOiJwZW5kaWVudGUiLCJsYXN0UmVwb3J0RGF0ZSI6IiBheWVyICIsIm1lbWJlclNpbmNlIjoiYXllciAiLCJ1c2VyVHlwZSI6ImEiLCJpYXQiOjE2NTIxMTYzNjUsImV4cCI6MTY1MjExOTk2NX0.bDs5NobltWHg_mtGRnc-daOkN4eQoK8_BAu76QVImsY'
      }
    })
    .then((response) => { 
        return response.json().then((data) => {
            console.log(data);
            return data;
        }).catch((err) => {
            console.log(err);
        }) 
    });
}
  
export default function Moldes() {
    const [moldes, setMoldes] = useState([]);

    const fetchData = useCallback(async () => {
        const data = await getMoldes()
      
        setMoldes(data);
      }, [])

    useEffect(() => {
        fetchData()
        // make sure to catch any error
        .catch(console.error);;    
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