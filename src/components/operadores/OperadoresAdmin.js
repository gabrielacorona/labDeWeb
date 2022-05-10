import React, {useEffect, useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from '../utils/Title';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

const mockProp = {
    users: [
        {
            firstName: "Andres",
            lastName: "Genda",
            userPicture: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
            company: "Chicago, IL"
        },
        {
            firstName: "Caro",
            lastName: "Obregon",
            userPicture: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
            company: "New York, NY"
        },
        {
            firstName: "Gaby",
            lastName: "Corona",
            userPicture: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
            company: "San Francisco, CA"
        },
        {
            firstName: "Corde",
            lastName: "Lopez",
            userPicture: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
            company: "Los Angeles, CA"
        },
        {
            firstName: "JC",
            lastName: "del Castillo",
            userPicture: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
            company: "Seattle, WA"
        },
    ]    
}

function OperatorList(props) {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {props.users.map((item) => (
                <ListItem secondaryAction={
                        <IconButton edge="end" aria-label="view">
                            <VisibilityIcon />
                        </IconButton>
                    }>
                    <ListItemAvatar>
                        <Avatar alt="Image Unavailable" src={item.userPicture}/>
                    </ListItemAvatar>
                    <ListItemText primary={item.firstName + " " + item.lastName} secondary={item.company} />
                </ListItem>
            ))}
        </List>
  );
}

function MisOperadores(props) {
    return (
        <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }} >
                <OperatorList users={mockProp.users} />
            </Paper>
        </Grid>
    );
}

export default function OperadoresAdmin() {
  return (
    <Box
        component="main"
        sx={{
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        }} >
        {/* CONTAINER WITH TITLE AND LIST OF OPERATORS */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Title>Operadores</Title>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <MisOperadores title="Descripcion" descripcion={mockProp.descripcion}/>
                </Grid>
            </Grid>
        </Container>
    </Box>
);
}