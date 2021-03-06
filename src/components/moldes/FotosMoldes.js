import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FotoMoldeCard from '../utils/FotoMoldeCard';

const mockProp = {
    nombreMolde : "MOLDE SUPREME",
    id : "12345675992",
    fechaAdquisicion : "12-03-2022",
    descripcion : 'Este es un molde para hacer botellas',
    tipoColada : 'Muy',
    encargado : "Andres",
    mockImages : [
        {
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          fechaPublicacion: '12 de agosto de 2022',
          descripcion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        },
        {
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          fechaPublicacion: '12 de agosto de 2022',
          descripcion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        },
        {
          img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
          fechaPublicacion: '12 de agosto de 2022',
          descripcion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        },
        {
          img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
          fechaPublicacion: '12 de agosto de 2022',
          descripcion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        },
        {
          img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
          fechaPublicacion: '12 de agosto de 2022',
          descripcion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        },
        {
          img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
          fechaPublicacion: '12 de agosto de 2022',
          descripcion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        },
        {
          img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
          fechaPublicacion: '12 de agosto de 2022',
          descripcion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        },
        {
          img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
          fechaPublicacion: '12 de agosto de 2022',
          descripcion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        },
        {
          img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
          fechaPublicacion: '12 de agosto de 2022',
          descripcion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        },
        {
          img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
          fechaPublicacion: '12 de agosto de 2022',
          descripcion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        },
        {
          img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
          fechaPublicacion: '12 de agosto de 2022',
          descripcion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        },
        {
          img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
          fechaPublicacion: '12 de agosto de 2022',
          descripcion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        },
      ]
}

export default function FotosMoldes() {
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
            <Grid container spacing={4}>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={2} lg={2}>
                        <Button variant="outlined" style={{width: "100%"}} startIcon={<ArrowBackIcon />}>Regresar</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={10} lg={10}>
                    <Typography>{mockProp.nombreMolde}</Typography>
                </Grid> 
                <Grid item xs={12} md={2} lg={2}>
                    <Typography>ID: {mockProp.id}</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <FotoMoldeCard imagenes={mockProp.mockImages}/>
                </Grid>
            </Grid>
        </Container>
    </Box>
);
}