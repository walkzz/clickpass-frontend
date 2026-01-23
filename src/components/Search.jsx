import React, { useState } from 'react';
import '../styles/Search.css';
import Dropdown from './Dropdown';

const Search = () => {
  const categoryOptions = [
    "All",
    "Theater",
    "Concert",
    "Cinema",
    "Opera"
  ];

  const locationOptions = [
    "All",
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "London, UK",
    "New Orleans, LA",
    "Boston, MA",
    "Seattle, WA",
    "Berlin, DE"
  ];
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");

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
        <input type="text" placeholder="Search by event name..." />
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