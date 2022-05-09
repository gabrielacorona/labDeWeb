import './App.css';
import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar'
import Reportes from './components/reportes/Reportes'
import Moldes from './components/moldes/Moldes'
import Login from './components/auth/Login'
import DetalleMoldes from './components/moldes/DetalleMoldes'
import FotosMoldes from './components/moldes/FotosMoldes'
import useToken from './useToken';
import InfoReportes from './components/reportes/InfoReportes'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const mdTheme = createTheme();

function App() {
  const { token, setToken } = useToken();
  console.log("mitoken", token)
  
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
  <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/reportes" element={<Reportes/>} />
        <Route path="/moldes" element={<Moldes/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/detallemoldes" element={<DetalleMoldes/>} />
        <Route path="/fotosmoldes" element={<FotosMoldes/>} />
        <Route path="/inforeportes" element={<InfoReportes/>} />
      </Routes>
      </Router>
    </Box>
  </ThemeProvider>
  );
}

export default App;