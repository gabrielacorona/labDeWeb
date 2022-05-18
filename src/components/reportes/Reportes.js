import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Title from '../utils/Title'
import ReportesCard  from './ReportesCard';
import NewItemCard from './NewItemCard';
import { getReportesByMolde, getReportesByCompany} from '../../services/reportes';
import { useParams } from "react-router";
import ReporteFilter from './ReporteFilter';
import { getUserById, getUserId } from '../../services/users';

const mockProp = {
    reportes: [
        {nombreMolde: "molde1", info: "abc"},
        {nombreMolde: "molde2", info: "def"},
        {nombreMolde: "molde3", info: "ghi"},
    ]
}

export default function Reportes() {
    var moldeid = new URLSearchParams(location.search).get("moldeid")

    const [reportes, setReportes] = useState();
    const [filter, setFilter] = useState(moldeid ? moldeid : 'Todos');

    const fetchReporteData = (async () => {
        var moldeReportes
        if(filter != 'Todos'){
            moldeReportes = await getReportesByMolde(filter)
        } else {
            const userId = getUserId()
            const userData = await getUserById(userId)
            var company = userData.company
          
            moldeReportes = await getReportesByCompany(company)
        }
        setReportes(moldeReportes);
      });

    useEffect(() => {
        fetchReporteData()
        .catch(console.error);
    }, [filter]);

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
                      <Title>Reportes</Title>
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                  <ReporteFilter filter={filter} setFilter={setFilter} />
                  </Grid>
                  <Grid item xs={9} md={9} lg={9}>
                  </Grid>
                  {reportes &&
                    reportes.map((data, index) => (
                        <ReportesCard data={data} cardNumber={index + 1} filter={filter}/>
                    ))}
                {filter != 'Todos' &&
                  <NewItemCard moldeId={filter}/> }
              </Grid>
          </Container>
      </Box>
  );
}
