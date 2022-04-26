import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/Card';

const PageTitle = styled(Typography)`
    color: #000000;
    font-weight: 500;
    margin-bottom: 0;
`;

const mockProp = {
    cardNumber : 2
}

const CardTtitle = styled(Typography)`
    font-weight: 500;
`;

function DetailCard(props) {
  return (
    <Card sx={{ maxWidth: 300 }} style={{margin: 30}}>
        <CardContent style={{padding: 20}} justifyContent="center">
            <CardTtitle color="text.primary" component="h2" variant="h5" gutterBottom>
                Molde {mockProp.cardNumber}
            </CardTtitle>
            <Button variant="outlined" color="primary" style={{marginRight: 15}}>
                Informacion
            </Button>
            <Button variant="outlined" color="secondary">
                Historial
            </Button>
            <Button variant="outlined" color="warning" style={{marginTop: 15, marginLeft: 40}}>
                Generar Reporte
            </Button>
        </CardContent>
    </Card>
  );
}

DetailCard.propTypes = {
  children: PropTypes.node,
};

export default DetailCard;