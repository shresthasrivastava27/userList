import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";

function Search({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div>
      <h2 className='text-2xl my-4'>List View</h2>
      <form onSubmit={handleSubmit} className='flex items-center w-full h-[50px] border rounded-lg'>
        <IoIosSearch className='mx-3 text-2xl'/>
        <input
          type="text"
          placeholder='Search User'
          value={searchTerm}
          onChange={handleChange}
          className='w-full h-full outline-none text-2xl rounded-lg'
        />
        <button type="submit" className="hidden">Search</button>
      </form>
    </div>
  );
}

export default Search;
