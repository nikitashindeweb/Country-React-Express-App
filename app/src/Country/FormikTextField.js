import React from 'react'
import { TextField } from '@mui/material';
import { useField } from 'formik';

const FormikTextField = (props) => {
  const [field, meta] = useField(props);

  // TextField error when value is null
  if (field.value === null) {
    field.value = ''
  }
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      {...field} {...props}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default FormikTextField;