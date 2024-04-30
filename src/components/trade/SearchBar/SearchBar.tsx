import React from "react";
import "./styles.css";
import search from "../../../assets/icons/search.svg";

type SearchBarProps = {
  placeholder: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <div className="searchBar">
      <input type="text" placeholder={placeholder} />
      <img src={search} alt="Search Icon" className="searchIcon" />
    </div>
  );
};

export default SearchBar;
