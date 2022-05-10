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
            <Route path="/" element={
                token ? <Home /> : <Login setToken={setToken}/>
              }
              />
            <Route path="/login" element={
              <Login setToken={setToken}/>
              }
            />
            <Route path="/signup" element={
              <SignUp />
              }
            />
            <Route path="/moldes" element={
              <Protected token={token}>
                <Moldes />
              </Protected>
              }
            />
            <Route path="/reportes" element={
              <Protected token={token}>
                <Reportes />
              </Protected>
              }
            />
            <Route path="/detallemolde/:id" element={
              <Protected token={token}>
                <DetalleMoldes />
              </Protected>
              }
            />
            <Route path="/fotosmoldes" element={
              <Protected token={token}>
                <FotosMoldes/>
              </Protected>
              }
            />
            <Route path="/inforeportes" element={
              <Protected token={token}>
                <InfoReportes/>
              </Protected>
              }
            />
            <Route path="/operadores" element={
              <Protected token={token}>
                <OperadoresAdmin/>
              </Protected>
              }
            />
            <Route path="/agregarmolde" element={
              <Protected token={token}>
                <AgregarMolde/>
              </Protected>
              }
            />
            <Route path="/editarmolde" element={
              <Protected token={token}>
                <EditarMolde/>
              </Protected>
              }
            />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;