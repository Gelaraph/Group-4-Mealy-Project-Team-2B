/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BsLinkedin } from "react-icons/bs";
import { AiFillTwitterSquare } from "react-icons/ai";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import LogoutModal from "./LogoutModal";
import Modal from "./Modal";

const Footer = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const handleLogoutModal = () => {
    setShowLogoutModal(false);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FooterSection>
      <footer className="top">
        <div>
          <div>
            <NavLink to="/" className="nav-logo footer-logo">
              MEALY
            </NavLink>
            <p>your fastest and reliable food and drink delivery partner</p>
          </div>
        </div>
        <div>
          <h2>Company</h2>
          <ul>
            <li>
              <a href="/about" onClick={scrollToTop}>
                About Us
              </a>
            </li>
            <li>
              <a href="/" onClick={scrollToTop}>
                Partnerships
              </a>
            </li>
            <li>
              <a href="/" onClick={scrollToTop}>
                Privacy
              </a>
            </li>
            <li>
              <a href="/" onClick={scrollToTop}>
                Policy
              </a>
            </li>
            <li>
              <a href="/contact" onClick={scrollToTop}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Services</h2>
          <ul>
            <li>
              <a href="/menu" onClick={scrollToTop}>
                Menu
              </a>
            </li>
            <li>
              <a href="/" onClick={scrollToTop}>
                Recipe
              </a>
            </li>

            <li>
              <a href="/" onClick={scrollToTop}>
                Delivery
              </a>
            </li>

            <li>
              <a href="/" onClick={scrollToTop}>
                Customer
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2>Support</h2>
          <ul>
            <li>
              <a href="/" onClick={scrollToTop}>
                Help Center
              </a>
            </li>
            <li>
              <a href="/" onClick={scrollToTop}>
                Status
              </a>
            </li>
            <li>
              <a href="/settings" onClick={scrollToTop}>
                Settings
              </a>
            </li>
            <li>
              <button
                type="button"
                className={`footer-logout-btn ${
                  isLandingPage ? "disabled" : ""
                }`}
                disabled={isLandingPage}
                onClick={() => setShowLogoutModal(true)}>
                Logout
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h2>Contact us</h2>
          <div className="links">
            <ul>
              <li>
                <a className="linkedin" href="/">
                  <BsLinkedin />
                </a>
              </li>
              <li>
                <a className="twitter" href="/">
                  <AiFillTwitterSquare />
                </a>
              </li>
              <li>
                <a className="instagram" href="/">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a className="facebook" href="/">
                  <FaFacebookSquare />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      {showLogoutModal && (
        <Modal
          onCloseModal={handleLogoutModal}
          title="Logout of mealy ??"
          className="logout-modal-title">
          <LogoutModal />
        </Modal>
      )}
    </FooterSection>
  );
};

const FooterSection = styled.div`
  width: 100%;
  background: #fa5a00;
  padding: 1em;
  padding-top: 40px;
  padding-left: 2.2em;
  padding-right: 2em;
  font-style: normal;
  line-height: 18px;
  color: #ffffff !important;
  ul {
    margin-block-start: 0;
    padding-left: 0;

    li {
      list-style: none;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;

      a {
        color: #ffffff !important;
      }
    }
  }
  .footer-logo {
    margin-left: 0 !important;
    color: #ffffff !important;
  }
  footer {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 40px;
    margin: 0 30px;
  }
  .footer-logout-btn {
    border: none;
    background: transparent;
    color: #ffffff;
    margin-top: 0;
    font-weight: 600;
    font-size: 15px;
    line-height: 24px;
  }

  @media (width < 620px) {
    footer {
      flex-direction: column;
      justify-content: center !important;
      width: 50%;
      margin: 0 auto;
    }
  }

  @media (width >= 620px) {
    footer {
      margin: 0 auto;
      padding: 0;
    }
  }

  footer.top {
    padding-bottom: 20px;
  }

  footer.top .links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  .links ul {
    display: flex;
    gap: 0.5em;
  }

  .links > div {
    display: grid;
    gap: 10px;
    margin-bottom: 30px;
  }

  footer h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 1em;
  }

  @media (width < 420px) {
    footer {
      text-align: center;
      align-items: center;
    }

    footer.top .links {
      grid-template-columns: 1fr;
    }
  }
  .footer-logout-btn.disabled {
    cursor: not-allowed;
    display: none !important;
  }
`;

export default Footer;
