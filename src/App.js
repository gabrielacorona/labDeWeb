import './App.css';
import React, {useEffect, useState, useCallback} from 'react';
import Sidebar from './components/sidebar/Sidebar'
import Reportes from './components/reportes/Reportes'
import Moldes from './components/moldes/Moldes'
import Photos from './components/Photos'
import Login from './components/auth/Login'
import Home from './components/Home'
import Protected from './components/auth/Protected'
import SignUp from './components/auth/SignUp'
import DetalleMoldes from './components/moldes/DetalleMoldes'
import FotosMoldes from './components/moldes/FotosMoldes'
import {useToken} from './services/token';
import { useUserId } from './services/users';
import InfoReportes from './components/reportes/InfoReportes'
import OperadoresAdmin from './components/operadores/OperadoresAdmin'
import InfoOperador from './components/operadores/InfoOperador'
import EditarOperador from './components/operadores/EditarOperador'
import InfoClientes from './components/clientes/InfoClientes'
import EditarCliente from './components/clientes/EditarCliente'
import AgregarMolde from './components/moldes/AgregarMolde'
import EditarMolde from './components/moldes/EditarMolde'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const mdTheme = createTheme();

function App() {
  const { token, setToken } = useToken();

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
          <Route path="/infooperador/:id" element={
            <Protected token={token}>
              <InfoOperador/>
            </Protected>
            }
          />
          <Route path="/editaroperador" element={
            <Protected token={token}>
              <EditarOperador/>
            </Protected>
            }
          />
          <Route path="/infoclientes/:id" element={
            <Protected token={token}>
              <InfoClientes/>
            </Protected>
            }
          />
          <Route path="/editarcliente" element={
            <Protected token={token}>
              <EditarCliente/>
            </Protected>
            }
          />
          <Route path="/agregarmolde" element={
            <Protected token={token}>
              <AgregarMolde/>
            </Protected>
            }
          />
          <Route path="/editarmolde/:id" element={
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