/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import styled from "styled-components";
import Button from "../../component/Button";

const AddCard = () => {
  const [loading, setLoading] = useState(false);
  const [cvc, setCvc] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [name, setName] = useState("");
  const [cardnumber, setCardNumber] = useState("");

  const handleCardNoChange = (e) => {
    const formattedValue = e.target.value.replace(/[^0-9]/g, "");
    const unformattedValue = formattedValue.replace(/[- ]/g, ""); // remove dashes or spaces
    setCardNumber(unformattedValue);
    // setCardDetails(setCardNumber);
  };

  function CcFormat(value) {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join("-") : value;
  }

  // handling form validaton for required fields
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setLoading(true);
      // sendCardDetails();
    }
    // setValidated(true);
  };

  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNo: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  return (
    <Wrapper>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <div className="mb-05 input-flex">
            <label className="i-label" htmlFor="card-name">
              Holder&lsquo;s Name
            </label>
            <input
              id="card-name"
              type="text"
              required
              className="acc-setup-input"
              placeholder="Smith Warren"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="">
          <div className="">
            <label className="i-label">Card Number</label>
            <input
              type="text"
              className="acc-setup-input"
              placeholder="Enter card number"
              value={CcFormat(cardDetails.cardNo) || ""}
              onChange={handleCardNoChange}
            />
          </div>
        </div>

        <div className="card-date-cvv-div flex">
          <div className="">
            <label className="i-label labeldiv">Expiry Date</label>
            <Datetime
              dateFormat="YYYY-MM"
              timeFormat={false}
              // onChange={(e) => {
              //   setExpiryDate(e.target.value);
              // }}
            />
          </div>

          <div className="">
            <label className="i-label label">CVV</label>
            <div>
              <input
                type="text"
                placeholder="123"
                required
                onChange={(e) => {
                  setCvc(e.target.value);
                }}
                className="setup-input"
              />
            </div>
          </div>
        </div>

        <div className="add-card-btn-div">
          <Button className="nbtn-2 add-card-btn" type="submit">
            {loading ? "Loading..." : "Save"}
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .input-flex {
    margin-bottom: 1em;
  }
  .card-date-cvv-div {
    gap: 1em;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;

    input {
      margin-top: 0.5em;
      padding: 0.7rem;
      outline: none;
      background: rgb(255, 255, 255);
      border: 1px solid rgb(187, 187, 196);
      border-radius: 16px;
      width: 100%;
      height: 30px;
    }
  }
  input {
    margin-top: 0.5em;
    padding: 0.7rem;
    outline: none;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(187, 187, 196);
    border-radius: 16px;
    width: 100%;
    height: 30px;
  }
  .add-card-btn-div {
    margin-top: 1.5em;
    padding-bottom: 1em;
  }
`;

export default AddCard;
