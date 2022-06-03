import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export default function ButtonAddImage(props) {
    return (
        <input
        id="addImage"
        type="file"
        accept="image/*"
        />
    );
}