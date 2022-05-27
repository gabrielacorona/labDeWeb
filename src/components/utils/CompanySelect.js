import React, {useEffect, useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getUserById, getOperadores, getClients } from '../../services/users';

export default function CompanySelect({company, setCompany, id}) {
    const [allCompanies, setAllCompanies] = useState();

    const handleChange = (event) => {
        setCompany(event.target.value);
    };

    const fetchCompanies = useCallback(async () => {
        const clientes = await getClients()
        setAllCompanies(clientes);
    }, [])


    useEffect(() => {
        fetchCompanies()
        .catch(console.error);
    }, []);

  return (
    allCompanies &&
    <Box sx={{ minWidth: 240 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Company</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={company}
          label="Company"
          onChange={handleChange}
        >
        { allCompanies.map(({ firstName, lastName, _id}) => (
            <MenuItem value={_id}> {firstName + ' ' + lastName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
