
import CountryData from '../Country/CountryData.json';

export function countryReducer(state = { init: false, data: [] }, action) {
  switch (action.type) {
    case 'LOAD_COUNTRIES': {
      return { ...state, ...action.payload }
    }
    case 'ADD_COUNTRY': {
      return { ...state, data: [...state.data, action.payload] }
    }
    default:
      return state;
  }
}

export function preLoadCountries() {
  return async (dispatch, getState) => {
    // preloaded? ignore this
    if (getState().countries.init === true) {
      return Promise.resolve();
    }

    return dispatch({
      type: 'LOAD_COUNTRIES',
      payload: {
        init: true,
        data: CountryData.countries
      }
    });
  }
}