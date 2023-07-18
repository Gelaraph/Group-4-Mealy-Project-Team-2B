/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../component/Layout";
import MealCustomizationComponentWrapper from "../../component/mealCustomization/MealCustomizationComponentWrapper";
import Input from "../../component/Input";
// import HelpIcon from "../../assets/images/hero/help-icon.svg";
import "../../component/authComp/HeroSection/heroSection.css";
import { Auth } from "../../utilities/auth";

const AuthHomePage = () => {
  const { state: user } = Auth();
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
    <Layout>
      <div className="hero-page-box">
        <div className="search">
          <h1 className="hero-title">
            Welcome{user.user?.name && `, ${user.user.name}`}
          </h1>
          <p className="hero-description">What would you like to eat?</p>
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
        {/* <div className="help-icon-box">
          <div className="help-icon">
            <img src={HelpIcon} alt="" />
          </div>
        </div> */}
      </div>
      <MealCustomizationComponentWrapper />
    </Layout>
  );
};

export default AuthHomePage;
