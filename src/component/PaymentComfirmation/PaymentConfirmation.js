import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
// import PaymentData from "../authComp/Data/PaymentConfirmation";
import Success from "../../assets/images/hero/success.svg";
import "./paymentConfirmation.css";

const PaymentConfirmation = () => (
  <div className="payment-main-box">
    <div className="payment-modal">
      <div className="payment-box">
        <div className="payment-success">
          <img src={Success} alt="" />
        </div>
        <h1 className="payment-title">Payment Successful</h1>
        {/* <div className="payment-details">
          {PaymentData.map((item) => (
            <div className="payment-detail" key={item.id}>
              <p className="payment-info">{item.title}</p>
              <p className="payment-info-info">{item.details}</p>
            </div>
          ))}
        </div>
        <div className="payment-total">
          <h3>Total</h3>
          <p>#33, 067</p>
        </div> */}

        <Link to="/order-tracking">
          <Button type="submit" className="track-order-btn">
            Track Order
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default PaymentConfirmation;
