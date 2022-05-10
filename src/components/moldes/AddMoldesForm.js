import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function AddMoldesForm(props) {
  const isEditing = props.editing;
  return (
    <React.Fragment>  
        <Grid item xs={12} >
          {isEditing ? <TextField
            disabled
            id="id"
            name="id"
            label="ID del molde"
            variant="standard"
            defaultValue={props.mock.id}
          /> : <TextField
            required
            id="id"
            name="id"
            label="ID del molde"
            variant="standard"
          />}
        </Grid>
        <Grid item xs={12} >
          {isEditing ? 
            <TextField
              required
              id="nombreMolde"
              name="nombreMolde"
              label="Nombre del molde"
              variant="standard"
              defaultValue={props.mock.nombreMolde}
            /> : <TextField
              required
              id="nombreMolde"
              name="nombreMolde"
              label="Nombre del molde"
              variant="standard"
            />
          }
        </Grid>
        <Grid item xs={12}>
          {isEditing ?
            <TextField
              required
              id="fechaAdquisicion"
              name="fechaAdquisicion"
              label="Fecha"
              variant="standard"
              defaultValue={props.mock.fechaAdquisicion}
            /> : <TextField
              required
              id="fechaAdquisicion"
              name="fechaAdquisicion"
              label="Fecha"
              variant="standard"
            />
          }
        </Grid>
        <Grid item xs={12}>
          {isEditing ?
            <TextField
              required
              id="encargado"
              name="encargado"
              label="Encargado"
              variant="standard"
              defaultValue={props.mock.encargado}
            /> : <TextField
              required
              id="encargado"
              name="encargado"
              label="Encargado"
              variant="standard"
            />
          }
        </Grid>
        <Grid item xs={12}>
          {isEditing ?
            <TextField
              required
              id="tipoColada"
              name="tipoColada"
              label="Tipo de colada"
              variant="standard"
              defaultValue={props.mock.tipoColada}
            /> : <TextField
              required
              id="tipoColada"
              name="tipoColada"
              label="Tipo de colada"
              variant="standard"
            />
          }
        </Grid>
        <Grid item xs={12} md={12} lg={12}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          {isEditing ?
            <TextField
              id="descripcion"
              name="descripcion"
              label="Descripcion"
              multiline
              rows={8}
              style={{backgroundColor:"#ffffff"}}
              defaultValue={props.mock.descripcion}
            /> : <TextField
              id="descripcion"
              name="descripcion"
              label="Descripcion"
              multiline
              rows={8}
              style={{backgroundColor:"#ffffff"}}
            />
          }
        </Grid>
    </React.Fragment>
  );
}