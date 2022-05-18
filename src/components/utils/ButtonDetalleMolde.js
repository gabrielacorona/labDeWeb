import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
    root: {
        background: 'rgb(238, 238, 238)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgb(221, 221, 221)',
        height: 150,
        width: '100%',
    },
  });
  
  export default function ButtonDetalleMolde(props) {
    const classes = useStyles();
    return <Button className={classes.root}>{props.title}</Button>;
  }