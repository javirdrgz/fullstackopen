const Filter = ({ filter, handleOnChange }) => {
  return (
    <label>
      Filter shown with: <input value={filter} onChange={handleOnChange} />
    </label>
  );
};

export default Filter;
