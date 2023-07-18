import React from "react";
import styled from "styled-components";
import HeroBackgroundImg from "../../assets/herobg.png";
import LocationSearch from "../../component/LocationSearch";
import FoodCarousel from "../../component/foodCarousel/FoodCarousel";
import NavBar from "../../component/NavBar";
import Feature from "./Feature";
import Attributes from "./Attributes";
import Discount from "./Discount";
import Footer from "../../component/Footer";
import DiscountBox from "./DiscountBox";

const Home = () => (
  <>
    <NavBar />
    <HeroSection>
      <div className="hero-section">
        <div className="hero-section-overlay" />
        <div className="hero-section-content">
          <h1>
            Order your favorite meal <br />
            at the comfort of your home
          </h1>
          <p>Guaranteed Swift responsiveness to your orders</p>
          <LocationSearch />
        </div>
      </div>

      <FoodCarousel numCards={7} />

      <div className="discount-img-div">
        <DiscountBox />
      </div>

      <Feature />

      <Attributes />

      <Discount />
      <Footer />
    </HeroSection>
  </>
);

const HeroSection = styled.div`
  padding-top: 7em;
  .hero-section {
    position: relative;
    height: 80vh;
    justify-content: center;
    align-items: center;
  }
  .hero-section-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        0deg,
        rgba(84, 84, 107, 0.38),
        rgba(84, 84, 107, 0.38)
      ),
      url(${HeroBackgroundImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
  }
  .hero-section-content {
    padding: 1em;
    padding-top: 2.5em;
    text-align: center;
    margin: 0 auto;
    color: #f8fbff;
    padding-bottom: 5em;
  }
  .hero-section-content h1 {
    font-weight: 700;
    font-size: 64px;
    line-height: 77px;
    text-align: center;
    color: #ffffff;
  }
  .hero-section-content p {
    font-weight: 400;
    font-size: 30px;
    line-height: 36px;
    color: #fedecc;
  }
  .discount-img-div {
    justify-content: end;
    display: flex;
    margin-top: 2em;
    padding-right: 1em;
    @media (min-width: 569px) {
      padding-right: 3em;
    }
  }
  .discount-img {
    width: 90%;
  }
  .features-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 19px;
    width: 293px;
    margin-left: 3em;
    margin-top: 3em;
    h4 {
      font-weight: 700;
      font-size: 26px;
      line-height: 44px;
      color: #fa5a00;
      margin-bottom: 0;
      margin-top: -2em;
    }
    ul {
      margin-top: -1em;
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
      color: #1e1e1e;
      padding-left: 0;
      li {
        list-style: none;
      }
    }
  }
  .bike-img {
    width: 380px;
    height: 396px;
  }
  @media (max-width: 935px) {
    .attributes-section {
      justify-content: center !important;
      flex-wrap: wrap;
      margin-top: 3em;
      margin-bottom: 5em;
    }
    .attributes-section > div {
      width: 100% !important;
      align-items: center;
      display: grid;
      place-items: center;
    }
    .features-section {
      margin-top: 3em;
    }
  }
  .attributes-section {
    display: flex;
    justify-content: center;
    padding-right: 2em;
    padding-left: 2em;
    place-items: center;
    gap: 4em;
    letter-spacing: 0.01em;
    color: #3e2d2d;
    line-height: 140%;
    align-items: center;
    margin-bottom: 7em;
    h4 {
      font-weight: 700;
      font-size: 40px;
      margin: 0;
      line-height: 1em;
    }
    .attributes-section-subheader {
      font-weight: 500;
      font-size: 18px;
      margin-left: 2em;
    }
    p {
      font-weight: 400;
      font-size: 16px;
      padding-top: 12px;
    }
  }
  .attributes-section > div {
    width: 50%;
  }
  .attributes-section > div:first-child {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-left: 1em;
  }
  .attributes-section-col {
    display: grid;
    width: 95%;
    grid-template-columns: repeat(1, 1fr);
    h6 {
      font-weight: 700;
      font-size: 20px;
      line-height: 100%;
      letter-spacing: 0.01em;
      color: #000000;
      margin: 0;
    }
    .attributes-section-col-container {
      margin-top: 2em;
      padding: 20px 40px 20px 40px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: #ffffff;
      box-shadow: 0px 2px 16px rgba(255, 66, 46, 0.12);
      border-radius: 8px;
      flex-wrap: wrap;
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
  .attributes-section-col-container-item,
  .discount-container-item-register {
    width: 40%;
  }
  .discount-container-item-list-div {
    display: flex;
    gap: 1.5em;
  }
  .discount-btn {
    border-radius: 8px;
    margin-top: 2em;
    width: 374px;
  }
  .discount-header {
    font-weight: 500;
    font-size: 45px;
    line-height: 120%;
    letter-spacing: 0.01em;
    color: #1e1e1e;
    margin: 0;
    display: grid;
    place-items: center;
  }
  .discount-container {
    background: linear-gradient(
      180deg,
      rgba(189, 189, 189, 0) 8.74%,
      rgba(189, 189, 189, 0.37) 61.46%,
      rgba(189, 189, 189, 0.99) 100%
    );
    padding: 20px 0;
    width: 93%;
    margin: 0 auto;
    margin-top: 3em;
    margin-bottom: 5em;
    display: flex;
    gap: 2em;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .discount-container-item-register {
    text-align: center;
    align-items: center;
    display: grid;
    place-items: center;
  }

  .discount-container-item-list {
    div {
      background: #ffffff;
      border-radius: 20px;
      width: 220px;
      height: 45px;
      font-weight: 400;
      font-size: 20px;
      line-height: 34px;
      color: #000000;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin-top: 0.7em;
    }
  }
  .discount-container-item-list-img {
    width: 150px;
    height: 150px;
  }
  @media (max-width: 896px) {
    .hero-section-content h1 {
      font-weight: 600;
      font-size: 55px;
      line-height: 70px;
    }
    .discount-container > div {
      width: 100%;
      justify-content: center !important;
    }
    .discount-container {
      width: 100%;
      justify-content: center !important;
      gap: 5em;
    }
    .discount-container-item-list div {
      width: 300px;
    }
    .discount-container-item-register {
      width: 70% !important;
    }
  }

  @media (max-width: 745px) {
    .hero-section-content h1 {
      font-size: 50px;
    }
    .hero-section-content p {
      font-size: 24px;
    }
  }
  @media (max-width: 678px) {
    .hero-section-content h1 {
      font-size: 40px;
      line-height: 60px;
    }
  }
  @media (max-width: 595px) {
    .hero-section-content h1 {
      font-size: 35px;
      line-height: 50px;
    }
  }
  @media (max-width: 547px) {
    .hero-section-content p {
      font-size: 18px;
    }
    .features-section h4 {
      font-size: 20px;
      line-height: 40px;
    }
    .features-section ul {
      font-size: 14px;
      line-height: 20px;
    }
  }
  @media (max-width: 435px) {
    .hero-section-content h1 {
      font-size: 28px;
      line-height: 40px;
    }
    .hero-section-content p {
      font-size: 14px;
    }
  }
  @media (max-width: 362px) {
    .hero-section-content h1 {
      font-size: 24px;
    }
  }
  @media (max-width: 1295px) {
    .attributes-section h4 {
      font-size: 30px;
    }
  }
  @media (max-width: 1098px) {
    .attributes-section h4 {
      font-size: 24px;
    }
  }
`;

export default Home;
