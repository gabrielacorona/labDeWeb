import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'
import Title from './utils/Title';

const PageTitle = styled(Typography)`
    font-weight: 500;
    margin-bottom: 0;
`;

function ButtonLink(props) {
  const goToPage = props.mylink;
  switch(goToPage){
    case 'reportes':
      return(
        <Link to={"/reportes"}>
            <Button variant="outlined" color="primary">
                    Ver reportes
            </Button>
        </Link>
      );
    case 'moldes':
      return(
        <Link to={"/moldes"}>
            <Button variant="outlined" color="primary">
                    Ver moldes
            </Button>
        </Link>
      );
    case 'operadores':
      return(
        <Link to={"/operadores"}>
            <Button variant="outlined" color="primary">
                    Ver operadores
            </Button>
        </Link>
      );
    case 'clientes':
      return(
        <Link to={"/clientes"}>
            <Button variant="outlined" color="primary">
                    Ver clientes
            </Button>
        </Link>
      );
  }
}

function NavigationCard(props) {
  return (
      <Grid item xs={12} md={6} lg={6}>
          <Card style={{margin: 30}}>
              <CardContent style={{padding: 20}} justifyContent="center">
                  <Typography color="text.primary" component="h2" variant="h5" justifyContent="center" textAlign="center" gutterBottom style={{fontWeight:500}}>
                      {props.name}
                  </Typography>
                  <CardActions disableSpacing style={{ display: 'flex', justifyContent: 'center' }}>
                      <ButtonLink mylink={props.linktopage} />
                  </CardActions>
                  
              </CardContent>
          </Card>
      </Grid>
  );
}

function Home(props) {
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
                    <Grid item xs={12} md={12} lg={12} justifyContent="center" textAlign="center">
                        <Title>¡Bienvenido!</Title>
                    </Grid>
                    <NavigationCard name="Reportes" linktopage="reportes"/>
                    <NavigationCard name="Moldes" linktopage="moldes"/>
                    <NavigationCard name="Operadores" linktopage="operadores"/>
                    <NavigationCard name="Clientes" linktopage="clientes"/>
                </Grid>
            </Container>
    </Box>
  );
}

Home.propTypes = {
  children: PropTypes.node,
};

export default Home;
