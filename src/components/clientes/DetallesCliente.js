import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

export default function DetallesCliente(props) {
  return (
    <React.Fragment>
      <Box sx={{ height: "100%", flexDirection: "column", display: "flex" }}>
        <Box sx={{ flexDirection: "row", display: "flex" }}>
          <Box sx={{ mr: 8 }}>
            <Grid item xs={12}>
              <TextField
                required
                id="id"
                name="id"
                label="ID"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="nombre"
                name="nombre"
                label="Nombre"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                variant="standard"
              />
            </Grid>
          </Box>
          <Box sx={{mr: 8}}>
            <Grid item xs={12}>
              <TextField
                required
                id="compania"
                name="conpania"
                label="Compañía"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="apellido"
                name="apellido"
                label="Apellido"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="celular"
                name="celular"
                label="Celular"
                variant="standard"
              />
            </Grid>
          </Box>
          <ThemeProvider theme={theme}>
            <Box sx={{flexDirection: "column", display: "flex", pt: 2}}>
              <Button color="primary" variant="outlined" type="submit" sx={{mb: 2}}>
                Editar
              </Button>
              <Button color="error" variant="outlined" type="submit">
                Eliminar
              </Button>
            </Box>
          </ThemeProvider>
        </Box>
        <Box sx={{ flexGrow: 1 }}> </Box>
        <Box>
          <Grid item xs={12}>
            <TextField
              required
              id="numOperadores"
              name="numOperadores"
              label="# Operadores"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="numReportes"
              name="numReportes"
              label="# Reportes"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="ultimoPago"
              name="ultimoPago"
              label="Ultimo Pago"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="deuda"
              name="deuda"
              label="Deuda"
              variant="standard"
            />
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}
