import React, { useEffect, useRef, useState } from "react";
import Input from "../../component/Input";
import "../../component/authComp/HeroSection/heroSection.css";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = (searchTermProp) => {
    if (searchTermProp.trim() !== "") {
      fetch(
        `https://mealy.onrender.com/api/v1/product/?product_id=${searchTermProp}`,
      )
        .then((response) => response.json())
        .then((data) => {
          const filteredResults = Array.isArray(data.data)
            ? data.data
                .filter((product) =>
                  product.name
                    .toLowerCase()
                    .includes(searchTermProp.toLowerCase()),
                )
                .slice(0, 6)
            : [];

          setSearchResults(filteredResults);
          setShowResultsDropdown(
            filteredResults.length > 0 || searchTermProp.length > 0,
          );
        })
        .catch((error) => {
          // console.error(error);
        });
    } else {
      setSearchResults([]);
      setShowResultsDropdown(false);
    }
  };

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim() !== "") {
      handleSearch(newSearchTerm);
    } else {
      setSearchResults([]);
      setShowResultsDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowResultsDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  return (
    <div>
      <Input
        type="text"
        id="search"
        placeholder="Search"
        className="search-input"
        value={searchTerm}
        onChange={handleChange}
        ref={inputRef}
      />
      {showResultsDropdown ? (
        <div className="search-results-dropdown">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <div key={product._id} className="product-search-item-card">
                <div className="search-item-img">
                  <img src={product.imageUrl} alt="" className="img" />
                </div>
                <div>
                  <h2 className="search-item-name">{product.name}</h2>
                  <small>${product.price}</small>
                </div>
              </div>
            ))
          ) : (
            <div className="search-item-not-found">
              <p>Search item not found.</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
