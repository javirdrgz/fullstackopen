import React from "react";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_2}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="200" alt={`Flag of ${country.name}`} />
    </div>
  );
};

export default Country;
