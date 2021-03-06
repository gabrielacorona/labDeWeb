import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'
import { getMoldeById } from '../../services/moldes';
import { Link } from 'react-router-dom';

function DetailCard(props) {
    console.log(props.foto, "mifoto")
    let pic = props.foto ?  props.foto : null
    console.log(pic)
    return (
    <Card sx={{ maxWidth: 300 }} style={{margin: 30}}>
        {props.foto && <CardMedia
            component="img"
            height="140"
            image={pic}
            style={{objectFit: 'scale-down'}}
        />}

        <CardContent style={{padding: 20}} justifyContent="center">
            <Typography color="text.primary" component="h2" variant="h5" gutterBottom style={{fontWeight:500}}>
                {props.nombreMolde}
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
                    <Link to={'/reportes?moldeid='+ props.idMolde}>
                        <Button variant="outlined" color="secondary">
                            Historial
                        </Button>
                    </Link>
                </Grid>
                <Grid item lg={2} />
                <Grid item lg={8}>
                    <Link to={'/addreporte/'+ props.idMolde}>
                        <Button variant="outlined" color="warning">
                            Generar Reporte
                        </Button>
                    </Link>
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