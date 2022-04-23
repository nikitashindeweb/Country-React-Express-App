import React, { useState, useEffect } from 'react';

import CountryDetails from './CountryDetails';
import CountryDropdown from './CountryDropdown';
import AddCountry from './AddCountry';
import { connect } from 'react-redux';

import {
  Grid,
} from '@mui/material';
import css from './Country.module.css';


const Index = (props) => {
  // initial list of countries
  const [countries, setCountries] = useState(props.countries);
  const [country, setCountry] = useState({})

  useEffect(() => {
    setCountries(props.countries)

    // Show default for details 
    if (props.countries.length > 0) {
      setCountry(country.rank ? country : props.countries[0]);
    }
  }, [props, country]);

  const handleRankChange = (event) => {
    const country_filter = countries.filter(country => country.rank === event.target.value);
    setCountry(country_filter[0]);
  };

  const handleAddCountry = (new_country) => {
    setTimeout(() => {
      setCountry(new_country);
    }, 100);
  }

  return (
    <React.Fragment>
      {countries.length > 0 && <Grid container justifyContent="center" className={css['margin-top-30']}>

        <Grid item md={8}>
          <Grid container justifyContent="center">
            <Grid item md={4}>
              <CountryDropdown
                list={countries}
                country_rank={country.rank}
                handleRankChange={handleRankChange}
              />
            </Grid>
            <Grid item md={6}>
              <CountryDetails country={country} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>}

      <AddCountry addCountry={handleAddCountry} />

    </React.Fragment>
  );
}

// export default Index;
export default connect(state => ({
  countries: state.countries.data
}), dispatch => ({ dispatch }))(Index)