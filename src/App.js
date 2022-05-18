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
import Operadores from './components/operadores/Operadores'
import InfoOperador from './components/operadores/InfoOperador'
import EditarOperador from './components/operadores/EditarOperador'
import InfoClientes from './components/clientes/InfoClientes'
import EditarCliente from './components/clientes/EditarCliente'
import AgregarMolde from './components/moldes/AgregarMolde'
import EditarMolde from './components/moldes/EditarMolde'
import AddReporte from './components/reportes/AddReporte';
import AddOperador from './components/operadores/AddOperador';
import DetallesOperador from './components/operadores/DetallesOperador';
import AddCliente from './components/clientes/AddCliente';
import Clientes from './components/clientes/Clientes';
import NotAllowed from './components/misc/NotAllowed';
import ListaCompanias from './components/pagos/ListaCompanias';
import DetallePago from './components/pagos/DetallePago';
import ListaPagos from './components/pagos/ListaPagos';
import AddPago from './components/pagos/AddPago';

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
          <Route path="/reportes/:moldeid" element={
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
          <Route path="/inforeportes/:reporteId" element={
            <Protected token={token}>
              <InfoReportes/>
            </Protected>
            }
          />
          <Route path="/addreporte/:moldeId" element={
            <Protected token={token}>
              <AddReporte />
            </Protected>
            }
          />
          <Route path="/operadores" element={
            <Protected token={token} noOperador={true}>
              <Operadores />
            </Protected>
            }
          />
          <Route path="/infooperador/:id" element={
            <Protected token={token} noOperador={true}>
              <InfoOperador />
            </Protected>
            }
          />
          <Route path="/editaroperador/:id" element={
            <Protected token={token} noOperador={true}>
              <EditarOperador />
            </Protected>
            }
          />
          <Route path="/infoclientes/:id" element={
            <Protected token={token} noOperador={true} noClient={true}>
              <InfoClientes  />
            </Protected>
            }
          />
          <Route path="/editarcliente/:id" element={
            <Protected token={token} noOperador={true} noClient={true} >
              <EditarCliente/>
            </Protected>
            }
          />
          <Route path="/agregarmolde/:id" element={
            <Protected token={token} noOperador={true}>
              <AgregarMolde/>
            </Protected>
            }
          />
          <Route path="/editarmolde/:id" element={
            <Protected token={token} noOperador={true}>
              <EditarMolde/>
            </Protected>
            }
          />
          <Route path="/addoperador/" element={
            <Protected token={token} noOperador={true}>
              <AddOperador/>
            </Protected>
            }
          />
          <Route path="/addcliente/" element={
            <Protected token={token} noOperador={true} noClient={true}>
              <AddCliente/>
            </Protected>
            }
          />
        <Route path="/clientes/" element={
            <Protected token={token} noOperador={true} noClient={true}>
              <Clientes />
            </Protected>
            }
          />
          <Route path="/notallowed/" element={
            <NotAllowed />
          }/>
          
          <Route path="/listacompanias" element={
            <Protected token={token} noOperador={true} noClient={true}>
              <ListaCompanias/>
            </Protected>
            }
          />

          <Route path="/detallepago/:id" element={
            <Protected token={token} >
              <DetallePago/>
            </Protected>
            }
          />

          <Route path="/listapagos" element={
            <Protected token={token}>
              <ListaPagos/>
            </Protected>
            }
          />

          <Route path="/addpago/" element={
            <Protected token={token}>
              <AddPago/>
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