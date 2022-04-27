import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function SpecsMolde(props) {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
    </React.Fragment>
  );
}
