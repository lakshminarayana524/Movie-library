// search.js

import React from 'react';
import './styles/search.css'

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="input-container">
      <input
      className='input-search'
        type="text"
        placeholder="Search Movies"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
