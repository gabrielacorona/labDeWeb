import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

function preventDefault(event) {
  event.preventDefault();
}

export default function Content(props) {
  return (
    <React.Fragment>
      <TextField
          id="diagnostico"
          name="diagnostico"
          label="Diagnostico"
          multiline
          rows={8}
        />
    </React.Fragment>
  );
}
