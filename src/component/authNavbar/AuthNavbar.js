/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { useCart } from "react-use-cart";
import location from "../../assets/images/locationVector.png";
import "./navbarLocation.css";
import LocationModal from "./LocationModal";
import CartModal from "./cartModal/CartModal";
import FixedCart from "./cartModal/FixedCart";
import { Overlay } from "./cartModal/Overlay";
import NotificationModal from "./notifcation/NotificationModal";
import FixedNotification from "./notifcation/FixedNotification";

const AuthNavbar = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const modalOverlayRef = useRef(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isnotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { totalItems } = useCart();

  const handleInputClick = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };

  const handleCloseModal = () => {
    setIsLocationModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalOverlayRef.current &&
        modalOverlayRef.current.classList.contains("modal-overlay") &&
        isLocationModalOpen
      ) {
        setIsLocationModalOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isLocationModalOpen]);

  return (
    <div className="authNavbar">
      <div className="header">
        <div>
          <NavLink to="/" className="nav-logo">
            MEALY
          </NavLink>
        </div>
        <div className="right-items">
          <div className="input-div">
            <img src={location} alt="" className="nav-location" />
            <input placeholder="Current Location" onClick={handleInputClick} />
            <FaCaretDown className="drop-down" style={{ fontSize: "24px" }} />
          </div>
          <div className="profile" />
          <div>
            <CartModal
              open={isCartModalOpen}
              onClose={() => setIsCartModalOpen(false)}
            />
            <FixedCart
              onOpen={() => setIsCartModalOpen(true)}
              cartItems={totalItems}
            />

            <Overlay
              onClick={() => setIsCartModalOpen(false)}
              open={isCartModalOpen}
            />
          </div>
          <div>
            <NotificationModal
              open={isnotificationModalOpen}
              onClose={() => setIsNotificationModalOpen(false)}
            />
            <FixedNotification
              onOpen={() => setIsNotificationModalOpen(true)}
              // notificationNumb={}
            />

            <Overlay
              onClick={() => setIsNotificationModalOpen(false)}
              open={isnotificationModalOpen}
            />
          </div>
        </div>
      </div>
      <div>
        {isLocationModalOpen && (
          <LocationModal
            ref={modalOverlayRef}
            onCloseModal={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default AuthNavbar;
