import { useState } from 'react';
import PropTypes from 'prop-types';

function PhoneBook({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const submitForm = e => {
    e.preventDefault();
    onSubmit(name, number);
    resetState();
  };

  const resetState = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={submitForm}>
      <label className="label name">
        Enter name
        <input type="text" value={name} name="name" onChange={handleChange} />
      </label>
      <label className="label number">
        Еnter number (7 to 9 digits)
        <input
          type="tel"
          value={number}
          name="number"
          onChange={handleChange}
          pattern="[0-9]{7,9}"
          title="7 to 9 digits allowed"
        />
      </label>
      <button type="submit" className="addContact">
        Add contact
      </button>
    </form>
  );
}

PhoneBook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PhoneBook;
