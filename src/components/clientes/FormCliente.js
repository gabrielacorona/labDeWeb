import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function actualizarClientData(e, clientData, setClientData, varName) {
  const auxClientData = { ...clientData };
  auxClientData[varName] = e.target.value;
  setClientData(auxClientData);
}

export default function DetallesCliente({ clientData, setClientData }) {
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
                value={clientData.id}
                onChange={(e) =>
                  actualizarClientData(e, clientData, setClientData, "id")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="nombre"
                name="nombre"
                label="Nombre"
                variant="standard"
                value={clientData.nombre}
                onChange={(e) =>
                  actualizarClientData(e, clientData, setClientData, "nombre")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                variant="standard"
                value={clientData.email}
                onChange={(e) =>
                  actualizarClientData(e, clientData, setClientData, "email")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                variant="standard"
                value={clientData.password}
                onChange={(e) =>
                  actualizarClientData(e, clientData, setClientData, "password")
                }
              />
            </Grid>
          </Box>
          <Box sx={{ mr: 8 }}>
            <Grid item xs={12}>
              <TextField
                required
                id="compania"
                name="conpania"
                label="Compañía"
                variant="standard"
                value={clientData.compania}
                onChange={(e) =>
                  actualizarClientData(e, clientData, setClientData, "compania")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="apellido"
                name="apellido"
                label="Apellido"
                variant="standard"
                value={clientData.apellido}
                onChange={(e) =>
                  actualizarClientData(e, clientData, setClientData, "apellido")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="celular"
                name="celular"
                label="Celular"
                variant="standard"
                value={clientData.celular}
                onChange={(e) =>
                  actualizarClientData(e, clientData, setClientData, "celular")
                }
              />
            </Grid>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}> </Box>
        <Box>
          <Grid item xs={12}>
            <TextField
              required
              id="num-operadores"
              name="num-operadores"
              label="# Operadores"
              variant="standard"
              value={clientData.numOperadores}
              onChange={(e) =>
                actualizarClientData(
                  e,
                  clientData,
                  setClientData,
                  "numOperadores"
                )
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
              value={clientData.numReportes}
              onChange={(e) =>
                actualizarClientData(
                  e,
                  clientData,
                  setClientData,
                  "numReportes"
                )
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="ultimo-pago"
              name="ultimo-pago"
              label="Ultimo Pago"
              variant="standard"
              value={clientData.ultimoPago}
              onChange={(e) =>
                actualizarClientData(e, clientData, setClientData, "ultimoPago")
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="deuda"
              name="deuda"
              label="Deuda"
              variant="standard"
              value={clientData.deuda}
              onChange={(e) =>
                actualizarClientData(e, clientData, setClientData, "deuda")
              }
            />
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}
