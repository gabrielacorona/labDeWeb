import React, {useEffect, useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getUserById, getUserId, useUserId, getUserMoldes } from '../../services/users';
import { getMoldes, getMoldesByCompany } from '../../services/moldes';
import { getClients } from '../../services/users';

export default function MoldesFilter({filter, setFilter}) {
    const [clientes, setClientes] = useState();

    const fetchClienteData = useCallback(async () => {
        const clientesData = await getClients()
        setClientes(clientesData);
      }, [])

    useEffect(() => {
        fetchClienteData()
        .catch(console.error);
    }, []);


    const handleChange = (event) => {
        setFilter(event.target.value);
    };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value={"Todos"}> Todos los moldes </MenuItem>
          {clientes && clientes.map(({ firstName, lastName, id}) => (
            <MenuItem value={id}> {firstName + " " + lastName} </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
