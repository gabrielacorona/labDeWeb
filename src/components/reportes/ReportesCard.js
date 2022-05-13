
import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";

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
                    {props.data.fecha}
                </Typography>
                <Box textAlign='center' style={{margin:10}}>
                    <Link to={'/inforeportes/'+ props.data.id}>
                        <Button variant="outlined" color="primary">
                            Ver Reporte
                        </Button>
                    </Link>
                </Box>
            </CardContent>
        </Card>
    );
}

ReportesCard.propTypes = {
  children: PropTypes.node,
};

export default ReportesCard;
