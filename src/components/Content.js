import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './utils/Title';
import {styled} from '@mui/material/styles';

function preventDefault(event) {
  event.preventDefault();
}

const TituloRosa = styled(Typography)`
    color: pink;
`;

export default function Content(props) {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <TituloRosa component="p" variant="h4">
        $3,024.00
      </TituloRosa>
      <Typography color="text.secondary">
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}