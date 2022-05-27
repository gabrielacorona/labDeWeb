import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function FormCliente({ isEditing, isStatic, clienteData }) {
  let showingData = isEditing || isStatic

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
                defaultValue={ showingData ? clienteData.firstName : ""}
                disabled={isStatic}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Apellido"
                variant="standard"
                defaultValue={showingData ? clienteData.lastName : ""}
                disabled={isStatic}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                variant="standard"
                defaultValue={showingData ? clienteData.email : "" }
                disabled={isStatic}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="telephone"
                name="telephone"
                label="Telefono"
                variant="standard"
                defaultValue={showingData ? clienteData.telephone : ""}
                disabled={isStatic}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="company"
                name="company"
                label="Compañia"
                variant="standard"
                defaultValue={showingData ? clienteData.company : ""}
                disabled={isStatic}
                />
            </Grid> 
            {showingData && <>
              <Grid item xs={12}>
                <TextField
                  required
                  id="memberSince"
                  name="memberSince"
                  label="Miembro desde"
                  variant="standard"
                  defaultValue={clienteData.memberSince}
                  disabled
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="numOperadores"
                  name="numOperadores"
                  label="# de Operadores"
                  variant="standard"
                  defaultValue={clienteData.operadores.length}
                  disabled
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="numOperadores"
                  name="numOperadores"
                  label="# de Moldes"
                  variant="standard"
                  defaultValue={clienteData.moldes.length}
                  disabled
                  />
              </Grid>
            </>}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
