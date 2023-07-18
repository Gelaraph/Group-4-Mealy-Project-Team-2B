/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import uniqueId from "../../component/uniqueId";
import Layout from "../../component/Layout";
import Orders from "./Orders/Orders";
import "./style.css";
import Delete from "./delete/Delete";
import LogoutModal from "../../component/LogoutModal";
import Modal from "../../component/Modal";
import Profile from "./profile/Profile";
import Payment from "./payment/Payment";


const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`vertical-tabpanel-${index}`}
    aria-labelledby={`vertical-tab-${index}`}>
    {value === index && (
      <div style={{ padding: "16px", paddingTop: 0 }}>
        <div className="dashboard-content-grid">{children}</div>
      </div>
    )}
  </div>
);

const SettingsDashboard = () => {
  const [value, setValue] = useState(0);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutModalClick = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
    setValue(0);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    if (newValue === 3) {
      handleLogoutModalClick();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      handleChange(index);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      handleChange(Math.max(0, value - 1));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      handleChange(Math.min(6, value + 1));
    }
  };

  useEffect(() => {
    const handleKeyDownGlobal = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        handleChange(Math.max(0, value - 1));
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        handleChange(Math.min(6, value + 1));
      }
    };
    document.addEventListener("keydown", handleKeyDownGlobal);

    return () => {
      document.removeEventListener("keydown", handleKeyDownGlobal);
    };
  }, [value]);

  const tabItems = [
    "My Profile",
    "Orders",
    "Payments",
    "Logout",
    // "Delete Account",
  ];

  return (
    <Layout>
      <div className="setting-dashboard-cont">
        <h1>Account settings</h1>
        <div className="orders-container flex">
          <div className="side-bar">
            <div role="tablist" className="tablist">
              {tabItems.map((item, index) => (
                <div
                  className={`tab-button ${
                    index === value ? "active-tab" : ""
                  }`}
                  key={uniqueId()}
                  id={`vertical-tab-${index}`}
                  aria-controls={`vertical-tabpanel-${index}`}
                  onClick={() => handleChange(index)}
                  tabIndex={value === index ? 0 : -1}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  role="tab">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="dashbaord-content-grid">
            <TabPanel value={value} index={0}>
              <Profile />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Orders />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Payment />
            </TabPanel>
            <TabPanel value={value} index={3}>
              {isLogoutModalOpen && (
                <Modal
                  onCloseModal={handleCloseLogoutModal}
                  title="Log out of mealy ?">
                  <LogoutModal />
                </Modal>
              )}
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Delete />
            </TabPanel>
          </div>
        </div>
      </div>
    </Layout>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default SettingsDashboard;
