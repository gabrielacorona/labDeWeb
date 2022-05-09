import * as React from 'react';
import { TextField } from '@mui/material';

export default function Content(props) {
  return (
    <React.Fragment>
      <TextField
          id="diagnostico"
          name="diagnostico"
          label="Diagnostico"
          multiline
          rows={8}
          style={{backgroundColor:"#ffffff"}}
        />
    </React.Fragment>
  );
}
