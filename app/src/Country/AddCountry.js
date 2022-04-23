import React, { useState, useEffect, useRef } from 'react'
import { preLoadCountries } from '../store/countryReducer';
import { connect } from 'react-redux'

import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormikTextField from './FormikTextField';
import axios from 'axios';

import {
  Grid,
  Divider,
  Button,
  FormHelperText
} from '@mui/material';
import css from './Country.module.css';


const AddCountry = (props) => {
  const { countries, addCountry } = props;
  const [ranks, setRanks] = useState([]);
  const [country_names, setCountryNames] = useState([]);

  const ref = useRef();

  useEffect(() => {
    const existing_ranks = [];
    const existing_names = [];

    countries.map(country => existing_ranks.push(country.rank))
    countries.map(country => existing_names.push(country.name))

    setRanks(existing_ranks)
    setCountryNames(existing_names)

  }, [countries]);

  const formValidation = yup.object({
    name: yup
      .string()
      .required('required')
      .min(3, 'min')
      .max(50, 'max')
      .test(
        "is-unique",
        "Name is not unique",
        value => !country_names.includes(value)
      ),
    rank: yup
      .number()
      .positive()
      .test(
        "is-unique",
        "Rank is not unique",
        value => !ranks.includes(value)
      )
      .required('required'),
    continent: yup
      .string()
      .required('required'),
    flag: yup
      .mixed()
      .required('required')
      .test(
        "fileFormat",
        "Unsupported Format",
        value => value && ["image/jpg", "image/png"].includes(value.type)
      )
  })

  return (
    <React.Fragment>
      <Divider variant="middle" className={css['margin-top-30']} />

      <Grid container justifyContent="center" className={css['margin-top-30']}>
        <Grid item md={7}>

          <Grid container spacing={1}>
            <Grid item md={12}>
              Add Country
            </Grid>
            <Grid item md={12}>
              <Formik
                initialValues={{
                  name: '',
                  rank: '',
                  continent: '',
                  flag: ''
                }}
                validationSchema={formValidation}
                validateOnMount={true}
                onSubmit={async (values, action) => {

                  const formData = new FormData();
                  formData.append('name', values.name);
                  formData.append('rank', values.rank);
                  formData.append('continent', values.continent);
                  formData.append('flag', values.flag, values.flag.name)

                  // Upload file
                  axios.post(`${process.env.REACT_APP_ENDPOINT}/upload`, formData)
                    .then((response) => {
                      if (response.data.status === 1) {

                        const new_country = {
                          ...values,
                          flag: response.data.file
                        }
                        // push to store
                        props.dispatch({
                          type: 'ADD_COUNTRY',
                          payload: new_country
                        })
                        addCountry(new_country);
                      } else {
                        // Do something
                      }
                    })

                  action.setSubmitting(false)
                  action.resetForm();
                  ref.current.value = "";

                }}>{(props) => {
                  return (
                    <Form>
                      <Grid container spacing={2} justify="space-between">
                        <Grid item xs={6}>
                          <FormikTextField
                            name="name"
                            label='Name'
                            type="text"
                            fullWidth
                            variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                          <FormikTextField
                            name="rank"
                            type="number"
                            label="Rank"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <FormikTextField
                            name="continent"
                            type="text"
                            label="Continent"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <input
                            name="flag"
                            type="file"
                            accept="image/*"
                            ref={ref}
                            onBlur={() => {
                              props.setFieldTouched('flag')
                            }}
                            onChange={(event) => {
                              props.setFieldValue("flag", event.currentTarget.files[0]);
                            }} />
                          {props.errors.flag && props.touched.flag && <FormHelperText><span className={css['red-color']}>{props.errors.flag}</span></FormHelperText>}
                        </Grid>
                      </Grid>

                      <Grid container justify="flex-end" alignItems="flex-end">
                        <Grid item xs={5}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!props.isValid || props.isSubmitting}>
                            Add Country
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )
                }}</Formik>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default connect(state => ({
  countries: state.countries.data
}), dispatch => {
  dispatch(preLoadCountries());
  return { dispatch }
})(AddCountry)
