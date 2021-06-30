import React from "react";
import Country from "./Country";

const Countries = ({ countries, showCountry }) => {
  const countriesLength = countries.length;
  if (countriesLength > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countriesLength === 1) {
    return <Country country={countries[0]} />;
  } else if (countriesLength === 0) {
    return <p>No results</p>;
  }

  return countries.map((country) => (
    <p key={country.name}>
      {country.name}{" "}
      <button onClick={() => showCountry(country.name)}>show</button>
    </p>
  ));
};

export default Countries;
