import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Descripcion from './Descripcion';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function DetallesForm() {
  return (
    <React.Fragment>  
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            required
            id="titulo"
            name="titulo"
            label="Titulo"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="fecha"
            name="fecha"
            label="Fecha"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="autor"
            name="autor"
            label="Autor"
            fullWidth
            // autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="diagnostico"
            name="diagnostico"
            label="Diagnostico"
            fullWidth
            // autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="costo-estimado"
            name="costo-estimado"
            label="Costo Estimado"
            fullWidth
            // autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={8} lg={20}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Descripcion />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}