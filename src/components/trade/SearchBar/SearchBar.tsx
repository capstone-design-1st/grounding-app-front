import React from "react";
import "./styles.css";
import search from "../../../assets/icons/search.svg";

type SearchBarProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <img src={search} alt="Search Icon" className="searchIcon" />
    </div>
  );
};

export default SearchBar;
