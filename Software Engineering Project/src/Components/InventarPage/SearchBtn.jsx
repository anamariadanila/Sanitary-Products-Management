import React from "react";
import '../../css/InventarPage/SearchBtn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => (

  <form action="/" method="get">
      <div class="wrap">
        <div class="search">
          <input type="text" class="searchTerm" placeholder="Search"/>
              <button type="submit" class="searchButton">
              <FontAwesomeIcon icon={faSearch} />
              </button>
        </div>
     </div>
  </form>
);

export default SearchBar;

     