
let Country = require('country-state-city').Country;
let State = require('country-state-city').State;

export const getCountries = () => {
    return Country.getAllCountries();
}

export const getStatesByCountryIso = (iso: string) => {
   return State.getStatesOfCountry(iso)
}