import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Descripcion from './Descripcion';

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
            // autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={8} lg={8}
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
