import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function AddMoldesForm(props) {
  const isEditing = props.editing;
  return (
    <React.Fragment>  
        <Grid item xs={12} >
          <TextField
            required
            id="nombreMolde"
            name="nombreMolde"
            label="Nombre del molde"
            variant="standard"
            defaultValue={isEditing ? props.mock.nombreMolde : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="fechaAdquisicion"
            name="fechaAdquisicion"
            label="Fecha"
            variant="standard"
            defaultValue={isEditing ? props.mock.fechaAdquisicion : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="tipoColada"
            name="tipoColada"
            label="Tipo de colada"
            variant="standard"
            defaultValue={isEditing ? props.mock.tipoColada : ""}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}
        >
          <TextField
            required
            id="costo"
            name="costo"
            label="Costo"
            variant="standard"
            defaultValue={isEditing ? props.mock.nombreMolde : ""}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}
        >
          <TextField
            required
            id="reparacion"
            name="reparacion"
            label="Ultima Reparacion"
            variant="standard"
            defaultValue={isEditing ? props.mock.nombreMolde : ""}
          />
        </Grid>

        <Grid item xs={12} md={12} lg={12}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <TextField
            id="descripcion"
            name="descripcion"
            label="Descripcion"
            multiline
            rows={8}
            style={{backgroundColor:"#ffffff"}}
            defaultValue={isEditing ? props.mock.descripcion : ""}
          />
        </Grid>

    </React.Fragment>
  );
}