import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Title from '../utils/Title'
import ReportesCard  from './ReportesCard';

const mockProp = {
    reportes: [
        {nombreMolde: "molde1", info: "abc"},
        {nombreMolde: "molde2", info: "def"},
        {nombreMolde: "molde3", info: "ghi"},
    ]
}

export default function Reportes() {
    const [reportes, setReportes] = useState([]);

    // useEffect(() => {
    //   axios.get('http://localhost:8080/reportes').then(res => {
    //     setReportes(res.data);
    // }).catch(error => {
    //     // TODO - Display error message
    //     console.error('There was an error!', error);
    //     });
    // }, []);
    
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
                      <Title>Reportes - </Title>
                  </Grid>
                  {mockProp.reportes.map(({nombreMolde}, index) => (
                      <ReportesCard nombreMolde={nombreMolde} cardNumber={index + 1}/>
                  ))}
              </Grid>
          </Container>
      </Box>
  );
}