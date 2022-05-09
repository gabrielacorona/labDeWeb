import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Descripcion from './Descripcion';

export default function DetallesForm(props) {
  return (
    <React.Fragment>  
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
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="autor"
            name="autor"
            label="Autor"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="diagnostico"
            name="diagnostico"
            label="Diagnostico"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="costo-estimado"
            name="costo-estimado"
            label="Costo Estimado"
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
    </React.Fragment>
  );
}