import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            Fecha de publicación
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
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