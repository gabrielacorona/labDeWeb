import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function FotoMoldeCard(props) {
  return (
    <Card sx={{ maxWidth: "100%" }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="180"
                image={props.image}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Fecha de publicación
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.fechaPublicacion}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  );
}