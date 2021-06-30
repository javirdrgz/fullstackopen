import "./App.css";
import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import axios from "axios";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setAllCountries(response.data));
  }, []);

  useEffect(() => {
    if (countries.length !== 1) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital}&appid=${WEATHER_API_KEY}`
      )
      .then((response) => setWeather(response.data));
  }, [countries]);

  const filterByName = (name, countries) => {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(name)
    );
  };

  const filterCountries = (e) => {
    setWeather({});
    const newSearch = e.target.value;
    const filteredCountries = newSearch
      ? filterByName(newSearch, allCountries)
      : [];
    setCountries(filteredCountries);
  };

  const showCountry = (name) => {
    const country = countries.find((country) => country.name === name);
    setCountries([country]);
  };

  return (
    <div>
      <label>
        Find Countries <input onChange={filterCountries} type="text" />
      </label>
      <Countries countries={countries} showCountry={showCountry} />
      {weather.name && (
        <div>
          <h3>Wheather in {weather.name}</h3>
          <p>Temperature: {weather.main.temp}F</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather.description}
          />
          <p>
            Wind: {weather.wind.speed} mph {weather.wind.deg} deg
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
