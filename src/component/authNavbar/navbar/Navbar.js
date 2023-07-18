/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { useCart } from "react-use-cart";
import {
  Items,
  LogoWrapper,
  MobileNavWrapper,
  NavItemsWrapper,
  NavWrapper,
} from "./navbar.styled";
import location from "../../../assets/images/locationVector.png";
import useScreenSize from "../../../hooks/useScreenSize";
import CartModal from "../cartModal/CartModal";
import FixedCart from "../cartModal/FixedCart";
import { Overlay } from "../cartModal/Overlay";
import NotificationModal from "../notifcation/NotificationModal";
import FixedNotification from "../notifcation/FixedNotification";
import LocationModal from "../LocationModal";
import "../navbarLocation.css";

const Navbar = () => {
  const [menuopen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const { screenWidth } = useScreenSize();
  const mobile = screenWidth <= 690;
  const tablet = screenWidth <= 1124;
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const modalOverlayRef = useRef(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isnotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { totalItems } = useCart();

  const handleCartClick = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };
  const handleNotifcationClick = () => {
    setIsNotificationModalOpen(!isnotificationModalOpen);
  };

  const handleInputClick = () => {
    setIsLocationModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };

  useEffect(() => {
    const handleOutsideClick = () => {
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

  const scrollHeader = () => {
    if (window.scrollY >= 40) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
  }, []);

  useEffect(() => {
    if (!tablet) {
      window.addEventListener("resize", setMenuOpen(false));
    }
  }, [tablet]);

  const navLinks = document.querySelectorAll(".nav--link--items > a");
  const navLogo = document.querySelector(".nav--logo");
  const removeClass = (items) => {
    items.forEach((item) => {
      item.classList.remove("active");
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      removeClass(navLinks);
      e.currentTarget.classList.add("active");
    });
  });

  navLogo?.addEventListener("click", () => removeClass(navLinks));

  return (
    <NavWrapper
      tablet={tablet}
      mobile={mobile}
      scroll={scroll}
      menuopen={menuopen}>
      <NavItemsWrapper>
        <Items className="nav--logo">
          <Link to="/">
            <LogoWrapper mobile={mobile} tablet={tablet} className="nav-logo">
              MEALY
            </LogoWrapper>
          </Link>
        </Items>

        <Items className="nav--link--items" tablet={tablet}>
          <div className="input-div">
            <img src={location} alt="" className="nav-location" />
            <input placeholder="Current Location" onClick={handleInputClick} />
            <FaCaretDown className="drop-down" style={{ fontSize: "24px" }} />
          </div>
        </Items>
        <Items className="nav--link--items" tablet={tablet}>
          <div className="profile" />
          <div>
            <CartModal open={isCartModalOpen} onClose={handleCartClick} />
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
              onClose={handleNotifcationClick}
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
        </Items>
      </NavItemsWrapper>
      {tablet && (
        //  display on tablet screen size
        <div className="mobile-nav-right-div flex">
          <div className="profile" />

          <div>
            <CartModal open={isCartModalOpen} onClose={handleCartClick} />
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
              onClose={handleNotifcationClick}
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

          <MobileNavWrapper
            tablet={tablet}
            mobile={mobile}
            className="nav--link--items open">
            <div className="input-div">
              <img src={location} alt="" className="nav-location" />
              <input
                placeholder="Current Location"
                onClick={handleInputClick}
                className="mobile-search-input"
              />
              <FaCaretDown className="drop-down" style={{ fontSize: "24px" }} />
            </div>
          </MobileNavWrapper>
        </div>
      )}

      <div>
        {isLocationModalOpen && (
          <LocationModal
            ref={modalOverlayRef}
            onCloseModal={handleCloseModal}
          />
        )}
      </div>
      {/* {tablet && (
        <Items onClick={() => setMenuOpen(!menuopen)}>
          <MenuBtn menuopen={menuopen} />
        </Items>
      )} */}
    </NavWrapper>
  );
};

export default Navbar;
