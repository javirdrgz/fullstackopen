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
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  const setStateOnChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const setNotificationWithTimeout = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({}), 8000);
  };

  const handleNameChange = setStateOnChange(setName);
  const handleNumberChange = setStateOnChange(setNumber);
  const handleSearchChange = setStateOnChange(setSearch);

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
            setNotificationWithTimeout(
              "success",
              `Modified ${person.name}'s phone`
            );
          })
          .catch((error) => {
            setNotificationWithTimeout("error", error.response.data.error);
          });
      }
      return;
    }

    personService
      .create(newPerson)
      .then((newPerson) => {
        setNotificationWithTimeout("success", `Added ${newPerson.name}`);
        setPersons(persons.concat(newPerson));
        setName("");
        setNumber("");
      })
      .catch((error) => {
        setNotificationWithTimeout("error", error.response.data.error);
      });
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setNotificationWithTimeout("success", `Deleted ${person.name}!`);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setNotificationWithTimeout("error", error.response.data.error);
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
