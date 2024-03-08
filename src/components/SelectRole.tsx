import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

export default function BasicSelect({ data }: { data: string[] }): JSX.Element {
  const [dataSelected, setDataSelected] = useState<string>(data[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setDataSelected(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 90 }}>
      <FormControl sx={{width: '50%'}} size="small">
        <InputLabel id="demo-simple-select-label">Rol</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dataSelected}
          label="Age"
          onChange={handleChange}
        >
					{ data.map((d, index) => (
						<MenuItem value={d} key={index}>{d}</MenuItem>
					)) }
        </Select>
      </FormControl>
    </Box>
  );
}