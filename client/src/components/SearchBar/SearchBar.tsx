import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useTodosContext } from '../../context/globalState';
import './SearchBar.css';

const SearchBar = () => {
  const { filterAll, getAll } = useTodosContext()!;

  const isInitialMount = useRef(true);
  const [queryString, setQueryString] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const queryString = event.currentTarget.value
      .toLowerCase()
      .replaceAll(/\s/g, '');
    setQueryString(queryString);
  };

  //this should run only on update cycles
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const queryTimeOut = setTimeout(() => {
        filterAll('queryString', queryString);
      }, 300);

      return () => {
        clearTimeout(queryTimeOut);
      };
    }
  }, [queryString]);

  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder="Search"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event)
        }
      />
    </section>
  );
};

export default SearchBar;
