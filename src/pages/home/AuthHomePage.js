/* eslint-disable react/prop-types */
import React from "react";
import Layout from "../../component/Layout";
import MealCustomizationComponentWrapper from "../../component/mealCustomization/MealCustomizationComponentWrapper";
// import HelpIcon from "../../assets/images/hero/help-icon.svg";
import "../../component/authComp/HeroSection/heroSection.css";
import { useAuth } from "../../utilities/auth";
import SearchInput from "./SearchInput";

const AuthHomePage = () => {
  const { state: user } = useAuth();
  return (
    <Layout>
      <div className="hero-page-box">
        <div className="search">
          <h1 className="hero-title">
            Welcome{user.user?.name && `, ${user.user.name}`}
          </h1>
          <p className="hero-description">What would you like to eat?</p>
          <SearchInput />
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
