import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DetallesOperador from "./DetallesOperador";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const themeMain = createTheme();

export default function InfoOperador() {
  const [operatorData, setOperatorData] = React.useState({});

  return (
    <ThemeProvider theme={themeMain}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            pt: 4,
            pb: 4,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography component="h1" variant="h4" align="left">
            Información Operador
          </Typography>
          <React.Fragment>
            <Box
              component="form"
              sx={{ display: "flex", justifyContent: "normal", flexGrow: 1 }}
            >
              <div>
                <Grid container spacing={3} sx={{ mt: 0, ml: 0 }}>
                  <DetallesOperador operatorData={operatorData} />
                </Grid>
              </div>
              <ThemeProvider theme={theme}>
                <Box sx={{ flexDirection: "column", display: "flex", pt: 2 }}>
                  <Button
                    color="primary"
                    variant="outlined"
                    type="submit"
                    sx={{ mb: 2 }}
                  >
                    Editar
                  </Button>
                  <Button color="error" variant="outlined" type="submit">
                    Eliminar
                  </Button>
                </Box>
              </ThemeProvider>
            </Box>
          </React.Fragment>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
