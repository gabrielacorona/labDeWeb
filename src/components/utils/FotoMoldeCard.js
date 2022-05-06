import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from "simple-react-lightbox";

export default function FotoMoldeCard(props) {
  return (
        <SimpleReactLightbox>
            <SRLWrapper>
                <Grid container spacing={4}>
                    {props.imagenes.map((item) => (
                        <Grid item xs={12} md={6} lg={4}>
                            <Card sx={{ maxWidth: "100%" }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={item.img}
                                        alt={item.descripcion}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" justifyContent="center" textAlign="center">
                                            Fecha de publicacion
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" justifyContent="center" textAlign="center">
                                            {item.fechaPublicacion}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </SRLWrapper>
        </SimpleReactLightbox>
  );
}