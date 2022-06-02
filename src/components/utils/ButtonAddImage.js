import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function ButtonAddImage(props) {
  const [file, setFile] = React.useState("");
  return (
    <Button
      variant="contained"
      component="label"
      startIcon={<AddIcon />}
      sx={{ borderRadius: 28, width: "100%", height: "150%" }}
    >
      {props.title}
      {file}
      <input
        id="buttonAddImage"
        name="fotos"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        hidden
        onChange={(e) => {
          console.log(JSON.stringify(e.target.value));
          setFile(e.target.value);
        }}
      />
    </Button>
  );
}
