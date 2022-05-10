import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export default function ButtonAddImage(props) {
    return (
        <Button 
        variant="contained" 
        type="submit" 
        startIcon={<AddIcon />} 
        sx={ { borderRadius: 28, width:"100%", height:"150%" } }
        >
            {props.title}
        </Button>
    );
}