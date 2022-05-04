import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'

function ReportesCard(props) {
  return (
    <Card sx={{ minWidth: 300, minHeight: 200}} style={{margin: 30}}>
        <CardContent style={{padding: 20}} justifyContent="center">
            <Typography color="text.primary" component="h2" variant="h5" gutterBottom style={{fontWeight:500}}>
                Reporte #{props.cardNumber}
            </Typography>
            <Typography>
                <b>Autor: </b> Rodrigo Barrenechea
            </Typography>
            <Typography>
                29/03/2022
            </Typography>
            <Box textAlign='center' style={{margin:10}}>
                <Button variant="outlined" color="primary">
                    Ver Reporte
                </Button>
            </Box>
        </CardContent>
    </Card>
  );
}

ReportesCard.propTypes = {
  children: PropTypes.node,
};

export default ReportesCard;