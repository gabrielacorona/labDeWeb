import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

function preventDefault(event) {
  event.preventDefault();
}

const CardTitle = styled(Typography)`
    font-weight: 600;
`;

const mockProp = {
    cardNumber : 2
}

export default function HomeCard(props) {
  return (
    <div>
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 160,
                width: 320
            }}
        >
        <CardTitle component="h2" variant="h5">
            Molde {mockProp.cardNumber}
        </CardTitle>
            <Grid
                container
                spacing={3}
                alignItems="center"
                justifyContent="center"
                style={{
                    paddingTop:15,
                    paddingBottom: 15,
                    width: 280
                }}>
                <Grid item xs={3} md={3} lg={7}>
                    <Button variant="outlined" color="primary">
                        Informacion
                    </Button>
                </Grid>
                <Grid item xs={3} md={3} lg={3}>
                    <Button variant="outlined" color="secondary">
                        Historial
                    </Button>
                </Grid>
                <Grid item xs={3} md={3} lg={3}>
                    <Button variant="outlined" color="warning">
                        Generar Reporte
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    </div>
  );
}