import React, {useEffect, useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getUserById, getOperadores } from '../../services/users';

export default function EncargadoSelect({age, setAge, id}) {
  const [encargados, setEncargados] = React.useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const fetchEncargados = useCallback(async () => {
    const operadores = await getOperadores(id)
    setEncargados(operadores);
  }, [])
  console.log(encargados, "misencargados")

  useEffect(() => {
    fetchEncargados()
      .catch(console.error);
  }, []);

  return (
    encargados &&
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {encargados && encargados.map(({ firstName, lastName, _id}) => (
            <MenuItem value={_id}> {firstName + " " + lastName} </MenuItem>
          ))}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
