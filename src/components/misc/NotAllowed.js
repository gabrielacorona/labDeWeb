import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const PageTitle = styled(Typography)`
    font-weight: 500;
    margin-bottom: 0;
`;

function NotAllowed(props) {
  return (
    <Typography component="h2" variant="h4" gutterBottom>
      Oh no you're not allowed!
    </Typography>
  );
}

export default NotAllowed;
