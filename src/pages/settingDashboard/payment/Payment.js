import React from "react";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import image1 from "../../../assets/image1.png";
import "../style.css";

const Payment = () => (
  <PaymentStyles>
    <div className="main">
      <div className="payment-container flex">
        <div className="profile-bal-container flex cont-border">
          <div className="section1">
            <h3>Available Balance</h3>
            <p className="amount">₦4100</p>
            <div className="add-balance flex">
              <AiFillPlusCircle />
              <p>Add money</p>
            </div>
          </div>
        </div>

        <div className="manage-card-container">
          <div className="section2">
            <h3>Manage Card</h3>
            <div className="card-info">
              <div className="card-number flex">
                <img
                  src={image1}
                  alt="mastercard-logo"
                  className="mastercard-logo"
                />
                <p>********2527 </p>
                <RiDeleteBin6Line className="delete-logo" />
              </div>
            </div>

            <div className="card-info2">
              <div className="card-number flex">
                <img
                  src={image1}
                  alt="MasterCard Logo"
                  className="mastercard-logo"
                />
                <p>********4312 </p>

                <RiDeleteBin6Line className="delete-logo" />
              </div>
            </div>
            <div className="section">
              <div className="add-card flex">
                <AiFillPlusCircle />
                <p>Add New Debit Card</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PaymentStyles>
);

const PaymentStyles = styled.div`
  color: #000000;
  h3 {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 0.5em;
  }
  .amount {
    font-weight: 700;
    font-size: 20px;
  }
  .add-balance {
    flex-direction: column;
    align-items: flex-end;
    margin-top: 1em;
  }
  .add-balance svg {
    margin-right: 2.2em;
  }
  .add-card svg,
  .add-balance svg {
    color: #fa5a00;
    font-size: 16px;
    cursor: pointer;
  }
  .add-card {
    align-items: center;
    gap: 0.5em;
    margin-top: 0.5em;
  }
  .add-balance p,
  .add-card p {
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
  }
  .delete-logo {
    color: #fa5a00;
    font-size: 20px;
    cursor: pointer;
  }
  .card-number {
    justify-content: space-between;
    margin-bottom: 1.5em;
    background-color: red;
    background: #ffffff;
    border: 2px solid #fa5a00;
    align-items: center;
    padding: 1em;
  }
  .mastercard-logo {
    width: 50px;
    height: 50px;
  }
`;
export default Payment;
