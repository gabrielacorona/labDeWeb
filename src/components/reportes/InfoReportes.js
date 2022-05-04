import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DetallesForm from '../DetallesForm';

function Copyright() {
return (
    <Typography variant="body2" color="text.secondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
        Your Website
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
    </Typography>
);
}
  
const steps = ['Shipping address'];

function getStepContent(step) {
    return <DetallesForm />;
}

const theme = createTheme();
  
export default function InfoReportes() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        {/* <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> */}
        <Typography component="h1" variant="h4" align="center">
            Reporte
        </Typography>
        <React.Fragment>
            {activeStep === steps.length ? (
            <React.Fragment>
                <Typography variant="h5" gutterBottom>
                Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
                </Typography>
            </React.Fragment>
            ) : (
            <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained" 
                    // onClick={HAY QUE METER UNA ACCION PARA GUARDAR EN LA BD}
                    sx={{ mt: 3, ml: 1 }}
                >
                    {'Guardar'}
                </Button>
                </Box>
            </React.Fragment>
            )}
        </React.Fragment>
        {/* </Paper> */}
        <Copyright />
    </Container>
    </ThemeProvider>
);
}