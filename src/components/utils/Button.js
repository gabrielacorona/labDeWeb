import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
    root: {
        background: 'rgba(250, 250, 250)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 150,
        padding: '0 30px',
    },
  });
  
  export default function CustomButton(props) {
    const classes = useStyles();
    return <Button className={classes.root}>{props.title}</Button>;
  }