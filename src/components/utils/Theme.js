import * as React from 'react';
import { styled } from '@mui/material/styles';

export const theme1 = createMuiTheme({
  typography: {
    typography: {
      textDecoration: "line-through",
      letterSpacing: "2px"
    },
    button: {
      fontStyle: "italic"
    }
  }
});

//TypographyExtended.jsx (this gets wrapped in ThemeProvider)
const useStyles = makeStyles((theme) => ({
  typography: {
    ...theme.typography.typography
  }
}));

const TypographyExtended = () => {
  const classes = useStyles();
  return (
    <Typography className={classes.typography} component="div">
      
      Letter Spacing 4px

    </Typography>
  );
};