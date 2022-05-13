import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Descripcion from './Descripcion';

export default function DetallesForm(props) {
  let isEditing = props.editing;
  let isStatic = props.isStatic
  console.log(props)
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
            defaultValue={isEditing || isStatic ? props.data.titulo : ""}
            disabled={isStatic}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="fecha"
            name="fecha"
            label="Fecha"
            variant="standard"
            defaultValue={isEditing || isStatic ? props.data.fecha : ""}
            disabled={isStatic}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="diagnostico"
            name="diagnostico"
            label="Diagnostico"
            variant="standard"
            defaultValue={isEditing  || isStatic? props.data.diagnostico : ""}
            disabled={isStatic}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="costo-estimado"
            name="costo-estimado"
            label="Costo Estimado"
            variant="standard"
            defaultValue={isEditing  || isStatic ? props.data.costoEstimado : ""}
            disabled={isStatic}
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
            defaultValue={isEditing  || isStatic ? props.data.descripcion : ""}
            disabled={isStatic}

          />
          
        </Grid>
    </React.Fragment>
  );
}