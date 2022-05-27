import React, {useEffect, useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getUserById, getUserId, useUserId, getUserMoldes } from '../../services/users';
import { getMoldes, getMoldesByCompany } from '../../services/moldes';

export default function ReporteFilter({filter, setFilter}) {
    const [moldes, setMoldes] = useState([]);

    const userId = getUserId()

    const fetchMoldeData = useCallback(async () => {
        const userData = await getUserById(userId)
        var company = userData.company

        const userMoldes = await getMoldesByCompany(company)
        setMoldes(userMoldes);
    }, [])

    useEffect(() => {
        fetchMoldeData()
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
          <MenuItem value={"Todos"}> Todos los reportes </MenuItem>
          {moldes && moldes.map(({ nombreMolde, id}) => (
            <MenuItem value={id}> {nombreMolde} </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
