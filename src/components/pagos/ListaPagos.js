import React, {useEffect, useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from '../utils/Title';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'

const mockProp = {
    pagos: [
        {
            fecha: "10 de enero de 2022"
        },
        {
            fecha: "10 de febrero de 2022"
        },
        {
            fecha: "10 de marzo de 2022"
        },
        {
            fecha: "10 de abril de 2022"
        },
    ]    
}

function PaymentList(props) {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {props.pay.map((item, index) => (
                <ListItem secondaryAction={
                    <Link to={'/detallepago/'+ item.id}>
                        <IconButton edge="end" aria-label="view">
                            <VisibilityIcon />
                        </IconButton>
                        </Link>
                    }>
                    <ListItemText primary={"Pago #" + (index+1)} secondary={item.fecha} />
                </ListItem>
            ))}
        </List>
  );
}

function MisPagos(props) {
    return (
        <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }} >
                <PaymentList pay={props.payments} />
            </Paper>
        </Grid>
    );
}

export default function ListaPagos() {
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
        }} >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={9} md={9} lg={9}>
                    <Title>Nombre Compania</Title>
                </Grid>
                <Grid item xs={3} md={3} lg={3}>
                    <Link to={'/addpago'}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            sx={{ mb: 2 }}
                        >
                            Agregar Nuevo
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <MisPagos title="Descripcion" payments={mockProp.pagos}/>
                </Grid>
            </Grid>
        </Container>
    </Box>
);
}