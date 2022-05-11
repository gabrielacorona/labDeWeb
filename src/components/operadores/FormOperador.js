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
                id="nombre"
                name="nombre"
                label="Nombre"
                variant="standard"
                value={operatorData.nombre}
                onChange={(e) =>
                  actualizarOperatorData(e, operatorData, setOperatorData, "nombre")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="contacto"
                name="contacto"
                label="Contacto"
                variant="standard"
                value={operatorData.contacto}
                onChange={(e) =>
                  actualizarOperatorData(e, operatorData, setOperatorData, "contacto")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="miembro-desde"
                name="miembro-desde"
                label="Miembro desde"
                variant="standard"
                value={operatorData.miembroDesde}
                
                onChange={(e) =>
                  actualizarOperatorData(e, operatorData, setOperatorData, "miembroDesde")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="num-reportes"
                name="num-reportes"
                label="# Reportes"
                variant="standard"
                value={operatorData.numReportes}
                
                onChange={(e) =>
                  actualizarOperatorData(e, operatorData, setOperatorData, "numReportes")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="ultimo-reporte"
                name="utimo-reporte"
                label="Ultimo reporte"
                variant="standard"
                value={operatorData.ultimoReporte}
                
                onChange={(e) =>
                  actualizarOperatorData(e, operatorData, setOperatorData, "ultimoReporte")
                }
              />
            </Grid>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
