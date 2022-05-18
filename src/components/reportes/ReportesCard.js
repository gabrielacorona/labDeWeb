
import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";
import { getUserByMongoId } from '../../services/users';

function ReportesCard(props) {
    const [autor, setAutor] = useState();

    const fetchAutorData = useCallback(async () => {
        if(props.filter != 'Todos'){
            let res = await getUserByMongoId(props.data.autor)
            setAutor(res.firstName + " " + res.lastName)
        } else{
            setAutor(props.data.autor[0].firstName + " "+ props.data.autor[0].lastName)
        }
    }, [])

    useEffect(() => {
        fetchAutorData()
        .catch(console.error);
    }, []);

    return (
        autor &&
        <Card sx={{ minWidth: 300, minHeight: 200}} style={{margin: 30}}>
            <CardContent style={{padding: 20}} justifyContent="center">
                <Typography color="text.primary" component="h2" variant="h5" gutterBottom style={{fontWeight:500}}>
                    Reporte #{props.cardNumber}
                </Typography>
                <Typography>
                    <b>Autor: </b> {autor}
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
