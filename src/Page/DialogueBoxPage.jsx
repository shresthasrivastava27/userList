import React, { useState } from 'react';
import Search from '../Component/Search';
import Accordion from '../Component/Accordion';
import person from '../constants/celebrities.json';

function DialogueBoxPage() {
  const [people, setPeople] = useState(person);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleToggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };


  const handleDelete = id => {
    setPeople(prevPeople => prevPeople.filter(person => person.id !== id));
  };

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
  };

  // Filter the people based on the search term
  const filteredPeople = people.filter(person =>
    `${person.first} ${person.last}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='max-container'>
      <Search handleSearch={handleSearch} />
      <div className="my-5 ">
        {filteredPeople.map((person, index) => (
          <Accordion
            key={person.id}
            person={person}
            editableFields={['first', 'last', 'dob', 'gender', 'country', 'description']}
            handleDelete={handleDelete}
            isOpen={openAccordion === index}
            toggleAccordion={() => handleToggleAccordion(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default DialogueBoxPage;
