import * as React from "react";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import ButtonAddImage from '../utils/ButtonAddImage';
import Image from "material-ui-image";

const BottomText = styled(Typography)`
    font-weight: 400;
    margin-bottom: 0;
    color: #555555;
    font-size: 1rem;
`;

export default function FormReporte({ isEditing, isStatic, reporteData }) {
  let showingData = isEditing || isStatic;
  console.log(reporteData)
  return (
    <React.Fragment>
      <Box
        sx={{
          height: "100%",
          flexDirection: "column",
          display: "flex",
          width: "80%",
          pt: 2,
          mb: 2,
        }}
      >
        <Box sx={{ mr: 8 }}>
          <Grid item xs={12}>
            <TextField
              required
              id="titulo"
              name="titulo"
              label="Titulo"
              autoComplete="given-name"
              variant="standard"
              defaultValue={showingData ? reporteData.titulo : ""}
              disabled={isStatic}
            />
          </Grid>
          <Grid item xs={12} sx={{ pt: 3 }}>
            <TextField
              required
              id="fecha"
              name="fecha"
              label="Fecha"
              variant="standard"
              defaultValue={showingData ? reporteData.fecha : ""}
              disabled={isStatic}
            />
          </Grid>
          <Grid item xs={12} sx={{ pt: 3 }}>
            <TextField
              required
              id="diagnostico"
              name="diagnostico"
              label="Diagnostico"
              variant="standard"
              defaultValue={showingData ? reporteData.diagnostico : ""}
              disabled={isStatic}
            />
          </Grid>
          <Grid item xs={12} sx={{ pt: 3 }}>
            <TextField
              required
              id="costo-estimado"
              name="costo-estimado"
              label="Costo Estimado"
              variant="standard"
              defaultValue={showingData ? reporteData.costoEstimado : ""}
              disabled={isStatic}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              p: 2,
              pl: 0,
              pt: 5,
              mb: 4,
              display: "flex",
              flexDirection: "column",
              height: 240,
              width: "70%",
            }}
          >
            <TextField
              id="descripcion"
              name="descripcion"
              label="Descripcion"
              multiline
              rows={8}
              style={{ backgroundColor: "#ffffff" }}
              defaultValue={ showingData ? reporteData.descripcion : ""}
              disabled={isStatic}
            />
          </Grid>
          { !isStatic  
          ?
          <Grid item xs={12} md={12} lg={12}>
            <BottomText component="h6" variant="h6" align="left">
                  Agregar Imagen
              </BottomText>
              <ButtonAddImage title="AGREGAR IMAGEN"/>
              <br></br>
              <br></br>
              <BottomText component="h6" variant="h6" align="left">
                  Descripcion de Imagen
              </BottomText>
              <input
                  id="imageDesc"
                  type="text" />
        </Grid>
          : reporteData.foto && 
          <Image src={reporteData.foto} />
          }
        </Box>
      </Box>
    </React.Fragment>
  );
}
