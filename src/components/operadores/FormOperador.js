import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function FormOperador({ isEditing, isStatic, operatorData }) {
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
                defaultValue={ showingData ? operatorData.firstName : ""}
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
                defaultValue={showingData ? operatorData.lastName : ""}
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
                defaultValue={showingData ? operatorData.email : "" }
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
                defaultValue={showingData ? operatorData.telephone : ""}
                disabled={isStatic}
              />
            </Grid>
            {showingData && <>
            <Grid item xs={12}>
              <TextField
                required
                id="company"
                name="company"
                label="Compañia"
                variant="standard"
                defaultValue={operatorData.company}
                disabled
                />
            </Grid> 
            <Grid item xs={12}>
              <TextField
                required
                id="lastReportDate"
                name="lastReportDate"
                label="Fecha de ultimo reporte"
                variant="standard"
                defaultValue={operatorData.lastReportDate}
                disabled
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="memberSince"
                name="memberSince"
                label="Miembro desde"
                variant="standard"
                defaultValue={operatorData.memberSince}
                disabled
                />
            </Grid>
            </>}
          </Box>
          <Grid
          item
          xs={12}
          md={12}
          lg={12}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          {operatorData?.fotos?.forEach((foto) => (
            <CardMedia
              component="img"
              alt="molde Botella"
              height="140"
              image={foto.image}
              style={{ objectFit: "scale-down" }}
            />
          ))}
        </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}
