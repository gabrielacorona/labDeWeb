import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'
import {Link } from "react-router-dom";
import { getMoldeById } from '../../services/moldes';

function DetailCard(props) {

    const fetchMoldeData = useCallback(async () => {
        console.log("props", props.idMolde)
        let moldeData = await getMoldeById(props.idMolde)
        console.log(moldeData, "mimolde")
    }, [])

    useEffect(() => {
        fetchMoldeData()
        .catch(console.error);
    }, []);

  return (
    <Card sx={{ maxWidth: 300 }} style={{margin: 30}}>
        <CardMedia
            component="img"
            alt="molde Botella"
            height="140"
            image="https://cdn.picpng.com/water_bottle/water-bottle-transparent-27778.png"
            style={{objectFit: 'scale-down'}}
        />

        <CardContent style={{padding: 20}} justifyContent="center">
            <Typography color="text.primary" component="h2" variant="h5" gutterBottom style={{fontWeight:500}}>
                Molde {props.cardNumber}
            </Typography>
            <Grid
            container
            spacing={3}
            direction="row"
            alignItems="center"
            justify="center"
            style={{paddingTop:10}}
            >
                <Grid item lg={6}>
                    <Link to={'/detallemolde/'+ props.idMolde}>
                        <Button variant="outlined" color="primary">
                            Informacion
                        </Button>
                    </Link>
                </Grid>
                <Grid item lg={6}>
                    <Button variant="outlined" color="secondary">
                        Historial
                    </Button>
                </Grid>
                <Grid item lg={2} />
                <Grid item lg={8}>
                    <Button variant="outlined" color="warning">
                        Generar Reporte
                    </Button>
                </Grid>
                <Grid item lg={2} />
            </Grid>
        </CardContent>
    </Card>
  );
}

DetailCard.propTypes = {
  children: PropTypes.node,
};

export default DetailCard;