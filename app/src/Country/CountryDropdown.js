import React from 'react';

import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';


const CountryDropdown = (props) => {

  const {
    list,
    country_rank,
    handleRankChange
  } = props;

  return (
    <React.Fragment>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Country</InputLabel>
          <Select
            labelId="select-label"
            value={country_rank}
            label="Country"
            onChange={handleRankChange} >
            {!!list.length && list.map(country => <MenuItem key={country.rank} value={country.rank}>{country.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

    </React.Fragment>
  );
}

export default CountryDropdown;