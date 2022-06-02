import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import EncargadoSelect from "./EncargadoSelect";
import { getUserId, getUserById } from "../../services/users";
import CompanySelect from "../utils/CompanySelect";

export default function AddMoldesForm(props) {
  const isEditing = props.editing;
  const [userType, setUserType] = useState();
  const [id, setId] = useState(props.id);

  const fetchUserData = useCallback(async () => {
    const userId = getUserId();
    const userData = await getUserById(userId);
    setUserType(userData.userType);
  }, []);

  useEffect(() => {
    fetchUserData().catch(console.error);
  }, []);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <TextField
          required
          id="nombreMolde"
          name="nombreMolde"
          label="Nombre del molde"
          variant="standard"
          defaultValue={isEditing ? props.mock.nombreMolde : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="fechaAdquisicion"
          name="fechaAdquisicion"
          label="Fecha"
          variant="standard"
          defaultValue={isEditing ? props.mock.fechaAdquisicion : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="tipoColada"
          name="tipoColada"
          label="Tipo de colada"
          variant="standard"
          defaultValue={isEditing ? props.mock.tipoColada : ""}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <TextField
          required
          id="costo"
          name="costo"
          label="Costo"
          variant="standard"
          defaultValue={isEditing ? props.mock.costo : ""}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <TextField
          required
          id="reparacion"
          name="reparacion"
          label="Ultima Reparacion"
          variant="standard"
          defaultValue={isEditing ? props.mock.ultimaReparacion : ""}
        />
      </Grid>
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
        <TextField
          id="descripcion"
          name="descripcion"
          label="Descripcion"
          multiline
          rows={8}
          style={{ backgroundColor: "#ffffff" }}
          defaultValue={isEditing ? props.mock.descripcion : ""}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <EncargadoSelect id={props.id} age={props.age} setAge={props.setAge} />
      </Grid>
      {userType == "a" && (
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CompanySelect
            company={props.company}
            setCompany={props.setCompany}
            id={props.id}
          />
        </Grid>
      )}
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
          {props.mock?.fotos?.forEach((foto) => (
            <CardMedia
              component="img"
              alt="molde Botella"
              height="140"
              image={foto.image}
              style={{ objectFit: "scale-down" }}
            />
          ))}
        </Grid>
    </React.Fragment>
  );
}
