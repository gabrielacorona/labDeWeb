import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function actualizarOperator(e, operatorData, setOperatorData, varName){
    const auxoperatorData = {...operatorData};
    auxoperatorData[varName] = e.target.value;
    setOperatorData(auxoperatorData);
}

export default function DetallesOperador({operatorData}) {
    return (
    <React.Fragment>
      <Box sx={{ height: "100%", flexDirection: "column", display: "flex" }}>
        <Box sx={{ flexDirection: "row", display: "flex" }}>
          <Box sx={{ mr: 8 }}>
            <Grid item xs={12}>
              <TextField
                disabled
                id="nombre"
                name="nombre"
                label="Nombre"
                variant="standard"
                value={operatorData.nombre}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="contacto"
                name="contacto"
                label="Contacto"
                variant="standard"
                value={operatorData.contacto}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="miembro-desde"
                name="miembro-desde"
                label="Miembro desde"
                variant="standard"
                value={operatorData.miembroDesde}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="num-reportes"
                name="num-reportes"
                label="# Reportes"
                variant="standard"
                value={operatorData.numReportes}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="ultimo-reporte"
                name="utimo-reporte"
                label="Ultimo reporte"
                variant="standard"
                value={operatorData.ultimoReporte}
              />
            </Grid>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}