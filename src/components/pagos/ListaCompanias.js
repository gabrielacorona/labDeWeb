import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Title from '../utils/Title'

const mockProp = {
    company : [
        {
            nombre : "Hersheys"
        },
        {
            nombre : "Coca-Cola"
        },
        {
            nombre : "Pepsi"
        },
        {
            nombre : "Ikea"
        },
    ]
}

function CompanyCard(props) {
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card style={{margin: 30}}>
                <CardContent style={{padding: 20}} justifyContent="center">
                    <Typography color="text.primary" component="h2" variant="h5" justifyContent="center" textAlign="center" gutterBottom style={{fontWeight:500}}>
                        {props.name}
                    </Typography>
                    <CardActions disableSpacing style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to={'/listapagos'}>
                            <Button variant="outlined" color="primary">
                                    Ver pagos
                            </Button>
                        </Link>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default function ListaCompanias() {
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
                        <Title>Historial de pagos</Title>
                    </Grid>
                    {mockProp.company.map((item) => (
                        <CompanyCard name={item.nombre}/>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
