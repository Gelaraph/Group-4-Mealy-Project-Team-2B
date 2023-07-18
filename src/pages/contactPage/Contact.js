/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { BsLinkedin, BsTelephoneInbound } from "react-icons/bs";
import { AiFillTwitterSquare, AiOutlineMail } from "react-icons/ai";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import "./contact.css";
import Layout from "../../component/Layout";

const Contact = () => (
  <Layout>
    <div className="contact-wrapper">
      <div className="contact-header">
        <h1>Contact us</h1>
      </div>
      <div className="contact-container">
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let&apos;s get in touch</h3>
            <p className="text">
              For urgent matters related to Mealy Delivery or Mealy Pickup
              orders, please contact the Mealy Customer Care Center at:
            </p>

            <div className="info">
              <div className="information">
                <GoLocation className="icon" />{" "}
                <p> Mile End Rd, Bethnal Green, London E1 4NS</p>
              </div>
              <div className="information">
                <AiOutlineMail className="icon" />
                <p>hellomealy@gmail.com</p>
              </div>
              <div className="information">
                <BsTelephoneInbound className="icon" /> <p>123-456-789</p>
              </div>
            </div>

            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                <a className="linkedin" href="/">
                  <BsLinkedin />
                </a>
                <a className="twitter" href="/">
                  <AiFillTwitterSquare />
                </a>
                <a className="instagram" href="/">
                  <FaInstagram />
                </a>
                <a className="facebook" href="/">
                  <FaFacebookSquare />
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form>
              <h3 className="title">Send a message</h3>
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  className="contact-input"
                  placeholder="Name"
                />
              </div>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  className="contact-input"
                  placeholder="Email"
                />
              </div>
              <div className="input-container">
                <input
                  type="tel"
                  name="phone"
                  className="contact-input"
                  placeholder="Phone Number"
                />
              </div>
              <div className="input-container textarea">
                <textarea
                  name="message"
                  className="contact-input"
                  placeholder="type text here..."
                />
              </div>
              <div className="contact-send-div flex">
                <button type="submit" className="btn flex">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
export default Contact;
