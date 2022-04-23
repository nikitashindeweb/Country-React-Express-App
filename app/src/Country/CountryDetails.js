import React from 'react';

import css from './Country.module.css';
import {
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';


const CountryDetails = (props) => {
  const { name, rank, continent, flag } = props.country

  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 345 }} className={`${css['margin-left-10']}`}>
        {flag && <CardMedia
          component="img"
          height="240"
          alt={name}
          image={require(`../../../storage/${flag}`)}
        />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Typography gutterBottom variant="body2" component="div">
            <div className={`${css.detail_label}`}>Country Rank</div>
            <div className={`${css.detail_info}`}>{rank}</div>
          </Typography>

          <Typography gutterBottom variant="body2" component="div">
            <div className={`${css.detail_label}`}>Country Continent</div>
            <div className={`${css.detail_info}`}>{continent}</div>
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default CountryDetails;