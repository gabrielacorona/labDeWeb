import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';

function NewMoldeCard(props) {
    return (
        <Card sx={{ minWidth: 300, maxHeight: 300}} style={{margin: 30}}>
            <CardContent style={{padding: 20}} justifyContent="center">
                <Typography color="text.primary" component="h2" variant="h5" gutterBottom style={{fontWeight:500}}>
                    Nuevo molde
                </Typography>
                <CardActions disableSpacing style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={'/agregarmolde/'+ props.id}>
                        <Button variant="outlined" color="primary">
                            Agregar Nuevo Molde
                        </Button>
                    </Link>
                </CardActions>
            </CardContent>
        </Card>
    );
}

NewMoldeCard.propTypes = {
  children: PropTypes.node,
};

export default NewMoldeCard;