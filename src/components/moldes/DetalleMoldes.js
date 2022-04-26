import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Content from '../Content';
import CustomButton from '../utils/Button';

export default function DetallesMoldes() {
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
        {/* CONTAINER WITH DESCRIPCION AND FOTOS AND REPORTES BUTTONS */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 300,
                    }}
                    >
                    <Content title="Descripcion"/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper
                    sx={{
                        p: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 150,
                        mb: 4,
                    }}
                    >
                    <CustomButton title="Fotos"/>
                    </Paper>
                    <Paper
                    sx={{
                        p: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 150,
                    }}
                    >
                    <CustomButton title="Reportes"/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        {/* CONTAINER WITH FECHA DE ADQUISICION AND AGREGAR MOLDE BUTTON */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 50,
                    }}
                    >
                    <Content title="Descripcion"/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper
                    sx={{
                        p: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 150,
                        mb: 4,
                    }}
                    >
                    <CustomButton title="Fotos"/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
  </Box>
);
}