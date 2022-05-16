import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function actualizarOperatorData(e, operatorData, setOperatorData, varName) {
  const auxoperatorData = { ...operatorData };
  auxoperatorData[varName] = e.target.value;
  setOperatorData(auxoperatorData);
}

export default function FormOperador({ operatorData, setOperatorData }) {
  return (
    <React.Fragment>
      <Box sx={{ height: "100%", flexDirection: "column", display: "flex" }}>
        <Box sx={{ flexDirection: "row", display: "flex" }}>
          <Box sx={{ mr: 8 }}>
            <Grid item xs={12}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="Nombre"
                variant="standard"
                // value={operatorData.nombre}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Apellido"
                variant="standard"
                // value={operatorData.contacto}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                variant="standard"
                // value={operatorData.miembroDesde}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                required
                id="company"
                name="company"
                label="Compañia"
                variant="standard"
                // value={operatorData.numReportes}
                />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                id="telephone"
                name="telephone"
                label="Telefono"
                variant="standard"
                // value={operatorData.ultimoReporte}
              />
            </Grid>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
