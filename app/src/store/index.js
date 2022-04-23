import { configureStore } from '@reduxjs/toolkit'
import { countryReducer } from './countryReducer'

export default configureStore({
  reducer: {
    countries: countryReducer,
  },
})