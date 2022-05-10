import './App.css';
import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar'
import Reportes from './components/reportes/Reportes'
import Moldes from './components/moldes/Moldes'
import Login from './components/auth/Login'
import DetalleMoldes from './components/moldes/DetalleMoldes'
import FotosMoldes from './components/moldes/FotosMoldes'
import {useToken} from './services/token';
import InfoReportes from './components/reportes/InfoReportes'
import OperadoresAdmin from './components/operadores/OperadoresAdmin'
import AgregarMolde from './components/moldes/AgregarMolde'
import EditarMolde from './components/moldes/EditarMolde'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const mdTheme = createTheme();

function App() {
  const { token, setToken } = useToken();

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
        <Route path="/detallemolde/:id" element={<DetalleMoldes/>} />
        <Route path="/fotosmoldes" element={<FotosMoldes/>} />
        <Route path="/inforeportes" element={<InfoReportes/>} />
        <Route path="/operadores" element={<OperadoresAdmin/>} />
        <Route path="/agregarmolde" element={<AgregarMolde/>} />
        <Route path="/editarmolde" element={<EditarMolde/>} />
      </Routes>
      </Router>
    </Box>
  </ThemeProvider>
  );
}

export default App;