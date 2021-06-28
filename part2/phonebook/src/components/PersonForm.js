const PersonForm = ({ values, handlers }) => {
  const { name, number } = values;
  const { handleSubmit, handleNameChange, handleNumberChange } = handlers;
  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a new Person</h3>
      <label>
        Name: <input value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Number: <input value={number} onChange={handleNumberChange} />
      </label>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
