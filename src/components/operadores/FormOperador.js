import * as React from "react";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ButtonAddImage from '../utils/ButtonAddImage';
import Typography from '@mui/material/Typography';

const BottomText = styled(Typography)`
    font-weight: 400;
    margin-bottom: 0;
    color: #555555;
    font-size: 1rem;
`;

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
            <br></br>
            <Grid item xs={12}>
              <BottomText component="h6" variant="h6" align="left">
                  Agregar Imagen
              </BottomText>
              <ButtonAddImage title="AGREGAR IMAGEN"/>
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
        </Box>
      </Box>
    </React.Fragment>
  );
}
