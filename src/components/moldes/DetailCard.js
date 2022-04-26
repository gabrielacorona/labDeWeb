import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/Card';
import Grid from '@mui/material/Grid'

function DetailCard(props) {
  return (
    <Card sx={{ maxWidth: 300 }} style={{margin: 30}}>
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
                    <Button variant="outlined" color="primary">
                        Informacion
                    </Button>
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