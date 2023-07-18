/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import Profile from "../../assets/images/tracking/profile.png";
import HelpIcon from "../../assets/images/hero/help-icon.svg";
import Star from "../../assets/images/tracking/star.svg";
import FullStar from "../../assets/images/tracking/fullStar.svg";
import FullCheck from "../../assets/images/tracking/fullCheck.svg";
import Orangebg from "../../assets/images/tracking/orangebg.svg";
import Call from "../../assets/images/tracking/call.svg";
import Layout from "../../component/Layout";
import "./orderTracking.css";
import CircleProgressBar from "./Circle";
import Chat from "./chatComponent/Chat";
import MapComponent from "./MapComponent";

const progressMinutes = 5;
const totalMinutes = 10;

const OrderTracking = () => {
  const [isInputVisible, setInputVisible] = useState(false);

  const handleHelpIconClick = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <Layout>
      <div className="order order-div">
        <div className="order__heading">
          <h2 className="order__title">Your Mealy is being delivered </h2>
        </div>
        <div className="order__map order_grid">
          <MapComponent />
        </div>
        <div className="order_grid progress__text">
          <CircleProgressBar
            progressMinutes={progressMinutes}
            totalMinutes={totalMinutes}
            size={75}
            strokeWidth={5}
            backgroundColor="#ccc"
            progressColor="#fa5a00"
            textColor="black"
          />
        </div>
        <div className="help-icon-box tracking-help-icon-box">
          <div
            className="help-icon"
            onClick={handleHelpIconClick}
            role="button"
            tabIndex="0">
            <img src={HelpIcon} alt="Help icon" />
          </div>

          {isInputVisible && (
            <div className="help-input-box">
              <Chat />
            </div>
          )}
        </div>
        <div className="rate order_flex gap-2">
          <div className="order_flex gap-2">
            <img src={Profile} alt="Profile" className="profile-pic" />
            <div className="">
              <p className="profile-name">Fayemi Seun</p>
              <div className="star-grp order_flex">
                <img src={FullStar} alt="Star rating" />
                <img src={FullStar} alt="Star rating" />
                <img src={FullStar} alt="Star rating" />
                <img src={FullStar} alt="Star rating" />
                <img src={Star} alt="Star rating" />
              </div>
            </div>
          </div>
          <div>
            <img src={Call} alt="Cellphone" className="call" />
          </div>
        </div>
        <div className="delivering-box">
          <p className="delivering">Delivering</p>
          <div className="order_line order_flex gap-2">
            <div className="order_line_progress">
              <img src={FullCheck} alt="Check" />

              <div className="rectangle" />

              <img src={FullCheck} alt="Check" />

              <div className="rectangle" />
              <div className="round-star">
                <img src={Orangebg} alt="Check" />
                <div className="round">
                  <p>5</p>
                </div>
              </div>

              <div className="rectangle" style={{ background: "#FCAC80" }} />

              <div className="round-star">
                <img src={Orangebg} alt="Check" />
                <div className="round" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderTracking;
