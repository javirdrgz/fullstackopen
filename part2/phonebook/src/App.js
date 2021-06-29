import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

import axios from "axios";

function App() {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const personsNames = persons.map((person) => person.name);
  const shownPersons = search
    ? persons.filter((person) => person.name.toLowerCase().includes(search))
    : persons;

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  const handleNumberChange = (e) => {
    const newNumber = e.target.value;
    setNumber(newNumber);
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (personsNames.includes(name)) {
      alert(`${name} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name,
      number,
    };

    setPersons(persons.concat(newPerson));
    setName("");
    setNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={search} handleOnChange={handleSearchChange} />
      <PersonForm
        values={{ name, number }}
        handlers={{ handleNumberChange, handleNameChange, handleSubmit }}
      />
      <h3>Numbers</h3>
      <Persons persons={shownPersons} />
    </div>
  );
}

export default App;
