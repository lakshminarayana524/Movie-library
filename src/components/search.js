// SearchBar.js

import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="input-container">
      <input
      className='input'
        type="text"
        placeholder="Search Movies"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar; 