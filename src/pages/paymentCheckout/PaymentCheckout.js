/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";
import "./checkoutStyle.css";
import calender from "../../assets/images/calendar.png";
import gtbank from "../../assets/images/Rectangle 8.png";
import Layout from "../../component/Layout";
import CheckoutSummary from "./CheckoutSummary";
import DateAndTime from "./DateAndTime";
import Accordion from "../../component/accordion/Accordion";
import AddCard from "./AddCard";
import Modal from "../../component/Modal";
import PaymentConfirmation from "../../component/PaymentComfirmation/PaymentConfirmation";

const PaymentCheckout = () => {
  const [scheduleDate, setScheduleDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [paymentCards, setPaymentCards] = useState([
    { id: 1, bank: "Guarantee Trust Bank", cardNumber: "**** **** 5678" },
    { id: 2, bank: "Access Bank", cardNumber: "**** **** 4536" },
    // Add more payment cards if needed
  ]);
  const handleDeleteCard = (cardId) => {
    const updatedCards = paymentCards.filter((card) => card.id !== cardId);
    setPaymentCards(updatedCards);
  };

  const handlePaymentModalClick = () => {
    if (selectedCard) {
      setIsPaymentModalOpen(true);
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
    setShowErrorMessage(false);
  };

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const showScheduleDate = () => {
    setScheduleDate(true);
  };

  const handleDateChange = (momentObj) => {
    // Handle the selected date value
    setSelectedDate(momentObj.format("DD-MM-YYYY HH:mm A"));
  };

  const hideScheduleDate = () => {
    setScheduleDate(false);
  };

  return (
    <PaymentCheckoutStyle>
      <Layout>
        <div className="payment-checkout flex">
          <div className="delivery-payment flex">
            <div className="payment">
              <div className="delivery-information flex">
                <h1>Delivery Information</h1>
                <form action="post" className="delivery-form flex">
                  <div className="name-number flex">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="name-input input"
                      placeholder="Name"
                    />
                    <input
                      type="number"
                      name="number"
                      id="number"
                      className="number input"
                      placeholder="Mobile number"
                    />
                  </div>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="current-location input"
                    placeholder="Current location"
                  />

                  <textarea
                    name="message"
                    id="message"
                    cols={30}
                    rows={5}
                    className="notes-area"
                    placeholder="Notes (Optional)"
                  />
                </form>
              </div>
            </div>
            <div className="schedule flex">
              <div className="schedule-text flex">
                <h1>Schedule Delivery</h1>
                <input
                  className="switch"
                  type="checkbox"
                  checked={isSwitchChecked}
                  onChange={(e) => setIsSwitchChecked(e.target.checked)}
                />
              </div>
              {isSwitchChecked && (
                <div className="calender-input flex">
                  <input
                    type="datetime"
                    name=""
                    value={selectedDate}
                    id=""
                    className="calender input"
                    placeholder="Select preferred date and time"
                  />
                  <img
                    src={calender}
                    alt=""
                    className="calender-img"
                    onClick={showScheduleDate}
                  />
                </div>
              )}
              {scheduleDate && (
                <div>
                  <DateAndTime
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                  <div className="save-selected-date-btn">
                    <button type="button" onClick={hideScheduleDate}>
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="payment-method flex">
              <h1>Payment Method</h1>
              <div className="pay flex">
                <div className="method flex">
                  <button
                    type="submit"
                    className={activeTab === 1 ? "active" : ""}
                    onClick={() => handleTabClick(1)}>
                    Pay Online
                  </button>
                  <button
                    type="submit"
                    className={activeTab === 2 ? "active" : ""}
                    onClick={() => handleTabClick(2)}>
                    Cash on Delivery
                  </button>
                  <button
                    type="submit"
                    className={activeTab === 3 ? "active" : ""}
                    onClick={() => handleTabClick(3)}>
                    Food Voucher
                  </button>
                </div>
                <div>
                  {/* Content for Tab 1 */}
                  {activeTab === 1 && (
                    <div className="existing-cards-div">
                      {paymentCards.map((card) => (
                        <div
                          key={card.id}
                          className={`payment-card flex ${
                            selectedCard === card.id ? "selected" : ""
                          }`}
                          onClick={() => handleCardClick(card.id)}>
                          <div className="">
                            <img src={gtbank} alt="" />
                          </div>
                          <div className="atm-texts">
                            <p>{card.bank}</p>
                            <small>{card.cardNumber}</small>
                          </div>
                          <div
                            className="delete-card"
                            onClick={() => handleDeleteCard(card.id)}>
                            <AiOutlineDelete />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Add content for other tabs (2 and 3) if needed */}
                </div>
                <Accordion
                  title="Add new card"
                  accordioncontent={<AddCard />}
                />
              </div>
            </div>
          </div>
          <CheckoutSummary
            onClick={handlePaymentModalClick}
            ErrorMessage={showErrorMessage}
          />
        </div>
        <div>
          {isPaymentModalOpen && (
            <Modal onCloseModal={handleClosePaymentModal}>
              <PaymentConfirmation />
            </Modal>
          )}
        </div>
      </Layout>
    </PaymentCheckoutStyle>
  );
};

const PaymentCheckoutStyle = styled.div`
  .input,
  textarea,
  .calender-input {
    padding: 0.5rem 0.7rem;
    outline: none;
    resize: none;
    border: 1px solid #32324d4f;
    border-radius: 5px;
  }
  .calender {
    border: none;
    padding-left: 0;
  }
  .calender-img {
    margin-left: 1em;
    cursor: pointer;
  }
  .save-selected-date-btn {
    background: #fff;
    display: flex;
    justify-content: center;
    button {
      outline: none;
      border: none;
      width: 70px;
      color: #ffffff;
      padding: 0.5em;
      border-radius: 3px;
      background-color: #fa5a00;
    }
  }
`;

export default PaymentCheckout;
