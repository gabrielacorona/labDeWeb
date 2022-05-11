import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function actualizarClientData(e, clientData, setClientData, varName){
    const auxClientData = {...clientData};
    auxClientData[varName] = e.target.value;
    setClientData(auxClientData);
}

export default function DetallesCliente({clientData}) {
    return (
    <React.Fragment>
      <Box sx={{ height: "100%", flexDirection: "column", display: "flex" }}>
        <Box sx={{ flexDirection: "row", display: "flex" }}>
          <Box sx={{ mr: 8 }}>
            <Grid item xs={12}>
              <TextField
                disabled
                id="id"
                name="id"
                label="ID"
                variant="standard"
                value={clientData.id}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="nombre"
                name="nombre"
                label="Nombre"
                variant="standard"
                value={clientData.nombre}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="email"
                name="email"
                label="Email"
                variant="standard"
                value={clientData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="password"
                name="password"
                label="Password"
                variant="standard"
                value={clientData.password}
              />
            </Grid>
          </Box>
          <Box sx={{mr: 8}}>
            <Grid item xs={12}>
              <TextField
                disabled
                id="compania"
                name="conpania"
                label="Compañía"
                variant="standard"
                value={clientData.compania}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="apellido"
                name="apellido"
                label="Apellido"
                variant="standard"
                value={clientData.apellido}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="celular"
                name="celular"
                label="Celular"
                variant="standard"
                value={clientData.celular}
              />
            </Grid>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}> </Box>
        <Box>
          <Grid item xs={12}>
            <TextField
                disabled
              id="num-operadores"
              name="num-operadores"
              label="# Operadores"
              variant="standard"
              value={clientData.numOperadores}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                disabled
              id="num-reportes"
              name="num-reportes"
              label="# Reportes"
              variant="standard"
              value={clientData.numReportes}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                disabled
              id="ultimo-pago"
              name="ultimo-pago"
              label="Ultimo Pago"
              variant="standard"
              value={clientData.ultimoPago}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                disabled
              id="deuda"
              name="deuda"
              label="Deuda"
              variant="standard"
              value={clientData.deuda}
            />
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}