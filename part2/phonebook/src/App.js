import { useState, useEffect } from "react";
import "./index.css";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.findAll().then((persons) => setPersons(persons));
  }, []);

  const personsNames = persons.map((person) => person.name);
  const shownPersons = search
    ? persons.filter((person) => person.name.toLowerCase().includes(search))
    : persons;

  const setStateOnChange = (setState) => (e) => {
    setState(e.target.value);
  };

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

    const newPerson = {
      name,
      number,
    };

    if (personsNames.includes(name)) {
      if (
        window.confirm(
          `${name} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        const person = persons.find((person) => person.name === name);
        personService
          .update(person.id, newPerson)
          .then((newPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === newPerson.id ? newPerson : person
              )
            );
            setNumber("");
            setName("");
            setNotification({
              type: "success",
              message: `Modified ${person.name}'s phone`,
            });
          })
          .catch(() => {
            setNotification({
              type: "error",
              message: `Failed to modify ${person.name}. Probably the person was already delted from server`,
            });
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
      return;
    }

    personService
      .create(newPerson)
      .then((newPerson) => {
        setNotification({
          type: "success",
          message: `Added ${newPerson.name}`,
        });
        setPersons(persons.concat(newPerson));
        setName("");
        setNumber("");
      })
      .catch(() =>
        setNotification({
          type: "error",
          message: `Failed to create ${newPerson}`,
        })
      );
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setNotification({
            type: "success",
            message: `Deleted ${person.name}!`,
          });
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          setNotification({
            type: "error",
            message: `Failed to delete ${person.name}!`,
          });
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={search} handleOnChange={handleSearchChange} />
      <PersonForm
        values={{ name, number }}
        handlers={{ handleNumberChange, handleNameChange, handleSubmit }}
      />
      <h3>Numbers</h3>
      <Persons persons={shownPersons} deletePerson={deletePerson} />
    </div>
  );
}

export default App;
