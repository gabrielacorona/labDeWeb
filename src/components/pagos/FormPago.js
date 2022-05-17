import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function FormPago() {
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
                label="ID del pago"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="fecha"
                name="fecha"
                label="Fecha"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="ultimoPago"
                name="ultimoPago"
                label="Ultimo pago"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="cobroPorMes"
                name="cobroPorMes"
                label="Cobro por mes"
                variant="standard"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="dirFactura"
                name="dirFactura"
                label="Direccion de factura"
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
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="cliente"
                name="cliente"
                label="Cliente"
                variant="standard"
              />
            </Grid>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
