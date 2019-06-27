import React from 'react';


const Search = ({ value, onChange, onSubmit, children }) =>
    <div>
      <form onSubmit={onSubmit}>
        {children} <input
          type='search'
          value={value}
          onChange={onChange}
        />
        <button type='submit'>
          {children}
        </button>
      </form>
    </div>

export default Search;
