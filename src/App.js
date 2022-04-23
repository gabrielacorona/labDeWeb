import './App.css';
import Sidebar from './components/sidebar/Sidebar'
import Reportes from './components/reportes/Reportes'
import Moldes from './components/moldes/Moldes'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const mdTheme = createTheme();

function App() {
  return (
  <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/reportes" element={<Reportes/>} />
        <Route path="/moldes" element={<Moldes/>} />
      </Routes>
      </Router>
    </Box>
  </ThemeProvider>
  );
}

export default App;