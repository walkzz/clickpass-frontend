import React, { useState, useEffect } from 'react';
import '../styles/Search.css';
import Dropdown from './Dropdown';

const Search = ({ events = [], onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const categoryOptions = ["All", ...new Set(events.map(e => e.Category).filter(Boolean))];
  const locationOptions = ["All", ...new Set(events.map(e => e.location?.city).filter(Boolean))];
  
  useEffect(() => {
    if (onSearch) {
      onSearch({ searchTerm, category, location });
    }
  }, [searchTerm, category, location, onSearch]);

  return (
    <div className='search-bar'>
      <div className='search-wrapper'>
        <svg
          style={{ marginLeft: '1rem' }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input 
          type="text" 
          placeholder="Search by event name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='dropdown-container'>
        <Dropdown
          options={categoryOptions}
          selected={category}
          onSelect={setCategory}
        />
        <Dropdown
          options={locationOptions}
          selected={location}
          onSelect={setLocation}
        />
      </div>
    </div>
  );
};

export default Search;