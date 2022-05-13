import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Title from '../utils/Title'
import ReportesCard  from './ReportesCard';
import NewItemCard from './NewItemCard';
import { getReportesByMolde } from '../../services/reportes';
import { useParams } from "react-router";

const mockProp = {
    reportes: [
        {nombreMolde: "molde1", info: "abc"},
        {nombreMolde: "molde2", info: "def"},
        {nombreMolde: "molde3", info: "ghi"},
    ]
}

export default function Reportes() {
    const [reportes, setReportes] = useState([]);
    let { moldeid } = useParams();

    const fetchReporteData = useCallback(async () => {
        const moldeReportes = await getReportesByMolde(moldeid)
        setReportes(moldeReportes);
      }, [])

    useEffect(() => {
        fetchReporteData()
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
                      <Title>Reportes - </Title>
                  </Grid>
                  {reportes.map((data, index) => (
                    <ReportesCard data={data} cardNumber={index + 1}/>
                  ))}
                  <NewItemCard />
              </Grid>
          </Container>
      </Box>
  );
}
