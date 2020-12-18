import { useState, useEffect } from 'react';
import ContactsList from './Components/ContactsList';
import FilterInput from './Components/FilterInput';
import PhoneBook from './Components/PhoneBook';
import Section from './Components/Section';
import './Components/styles.css';
import { v4 as uuidv4 } from 'uuid';


function App() {

const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];});

const [filter, setFilter] = useState('');
  
useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const newContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    if (name.trim() === '' || number.trim() === '') {
      alert ("Enter please new contact!");
    } else {
      setContacts(prevContacts =>
        [contact, ...prevContacts] 
        )
    }
  };

  const filterInput = e => {
    setFilter(e.currentTarget.value);
  };

    const contactsFilter = () => {
    const normlzFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normlzFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  return (
      <div className="main-container">
        <Section title="Phonebook">
          <PhoneBook
            onSubmit={newContact}
          />
        </Section>
        <Section title="Contacts">
          <FilterInput
            filter={filter}
            filterInput={filterInput}
          />
          <ContactsList
            contacts={contactsFilter()}
            deleteContact={deleteContact}
          />
        </Section>
      </div>
    );

}

export default App;
