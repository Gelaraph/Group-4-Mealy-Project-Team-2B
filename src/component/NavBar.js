import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

const NavBar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <NavStyle>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            MEALY
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/how-to-order"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}>
                How to Order
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/menu"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}>
                Our Menu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <a href="/sign-up">
                <Button type="button" className="nav-sign-up">
                  Sign up
                </Button>
              </a>
            </li>
            <li>
              <a href="sign-in">
                <Button type="button" className="nav-sign-in">
                  Sign in
                </Button>
              </a>
            </li>
          </ul>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
        </div>
      </nav>
    </NavStyle>
  );
};

export default NavBar;

const NavStyle = styled.div`
  .navbar {
    background-color: #f8f8f8;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 20;
    position: fixed;
    width: 100%;
  }

  .nav-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    max-width: 1500px;
  }

  .nav-menu {
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: 2rem;
  }

  .nav-links {
    color: #32324d;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;
    border-bottom: 3px solid transparent;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #32324d;
  }
  .fa-code {
    margin-left: 1rem;
  }

  .nav-item {
    line-height: 40px;
    margin-right: 1rem;
  }

  .nav-item:after {
    content: "";
    display: block;
    height: 3px;
    width: 0;
    background: transparent;
    transition: width 0.7s ease, background-color 0.5s ease;
  }

  .nav-item:hover:after {
    width: 100%;
    background: #fa5a00;
  }

  .nav-item .active {
    color: #fa5a00;
  }

  .nav-icon {
    display: none;
  }
  i:hover {
    box-shadow: none !important;
  }
  .nav-sign-up {
    margin-right: 1em;
    color: #32324d;
    background-color: transparent;
    border: 1px solid #fa5a00;
  }
  .nav-sign-up:hover {
    background-color: #fa5a00;
    color: #f8f8f8;
  }
  @media screen and (min-width: 960px) {
    .nav-sign-up,
    .nav-sign-in {
      width: 90px;
      height: 35px;
    }
  }
  @media screen and (max-width: 960px) {
    .nav-menu {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: absolute;
      top: 60px;
      left: -180%;
      opacity: 2;
      transition: all 0.5s ease;
    }

    .nav-menu.active {
      background: #f8f8f8;
      left: 0px;
      opacity: 1;
      transition: all 0.5s ease;
      z-index: 1;
    }
    .nav-item .active {
      color: #fa5a00;
      border: none;
    }
    .nav-links {
      padding: 0.5rem;
      width: 100%;
      display: table;
    }

    .nav-icon {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 60%);
      font-size: 1.8rem;
      cursor: pointer;
      color: #32324d;
    }
    .nav-sign-up,
    .nav-sign-in {
      width: 280px;
    }
  }
`;
