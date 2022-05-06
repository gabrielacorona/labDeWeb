import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DetallesForm from '../DetallesForm';
  
function getStepContent(step) {
    return <DetallesForm />;
}

const theme = createTheme();
  
export default function InfoReportes() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
        component="main"
        sx={{
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        }}
    >
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Typography component="h1" variant="h4" align="left">
                Reporte
            </Typography>
                <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'normal' }}>
                    <Button
                        variant="contained" 
                        // onClick={HAY QUE METER UNA ACCION PARA GUARDAR EN LA BD}
                        sx={{ mt: 3 }}
                    >
                        {'Guardar'}
                    </Button>
                    </Box>
                </React.Fragment>
        </Container>
    </Box>
    </ThemeProvider>
);
}