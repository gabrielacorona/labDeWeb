import * as React from 'react';
import { TextField } from '@mui/material';

export default function Content(props) {
  return (
    <React.Fragment>
      <TextField
          id="descripcion"
          name="descripcion"
          label="Descripcion"
          multiline
          rows={8}
          style={{backgroundColor:"#ffffff"}}
        />
    </React.Fragment>
  );
}
