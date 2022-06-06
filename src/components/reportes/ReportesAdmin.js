import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Title from '../utils/Title'
import ReportesAdminCard  from './ReportesAdminCard';
import NewItemCard from './NewItemCard';
import { getReportes, getReportesByMolde, getReportesByCompany} from '../../services/reportes';
import { useParams } from "react-router";
import ReporteFilter from './ReporteFilter';
import { getUserById, getUserId } from '../../services/users';
import CompanySelect from '../utils/CompanySelect';

const mockProp = {
    reportes: [
        {nombreMolde: "molde1", info: "abc"},
        {nombreMolde: "molde2", info: "def"},
        {nombreMolde: "molde3", info: "ghi"},
    ]
}

export default function ReportesAdmin() {
    var clienteid = new URLSearchParams(location.search).get("clienteid")
    const [filter, setFilter] = useState(clienteid ? clienteid : 'Todos');
    const [reportes, setReportes] = useState();
    const [user, setUser] = useState('');
    console.log(reportes, "reportesowo")
    const fetchReporteData = (async () => {
        if(filter != 'Todos'){
            const userData = await getUserById(filter)
            setUser(userData)
            const userReportes = await getReportesByCompany(userData.company)
            setReportes(userReportes);
        } else{
            const rep = await getReportes()
            setReportes(rep);
        }
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
                  <Grid item xs={9} md={9} lg={9}>
                  </Grid>
                  {reportes &&
                    reportes.map((data, index) => (
                        <ReportesAdminCard data={data} cardNumber={index + 1} filter={filter}/>
                    ))}
                {filter != 'Todos' &&
                  <NewItemCard moldeId={filter}/> }
              </Grid>
          </Container>
      </Box>
  );
}
