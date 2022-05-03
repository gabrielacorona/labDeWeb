import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function FotoMoldeCard(props) {
  return (
    <React.Fragment>
        {props.imagenes.map((item) => (
            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ maxWidth: "100%" }}>
                    <CardActionArea component={RouterLink} to="/DetalleFotoMolde">
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
    </React.Fragment>
  );
}