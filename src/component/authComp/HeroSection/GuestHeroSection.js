import React from "react";
// import HelpIcon from "../../../assets/images/hero/help-icon.svg";
import "./heroSection.css";
import SearchInput from "../../../pages/home/SearchInput";

const HeroSection = () => (
  <div className="hero-page-box">
    <div className="search">
      <h1 className="hero-title">Welcome, Guest</h1>
      <p className="hero-description">What would you like to eat?</p>
      <SearchInput />
    </div>
    {/* <div className="help-icon-box">
      <div className="help-icon">
        <img src={HelpIcon} alt="" />
      </div>
    </div> */}
  </div>
);

export default HeroSection;
