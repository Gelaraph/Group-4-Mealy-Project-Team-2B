import React from "react";
import styled from "styled-components";
import EmptyPana from "../../../assets/Empty-pana.svg";

const EmptyCart = () => (
  <EmptyStyle>
    <div>
      <img src={EmptyPana} alt="" />
      <h4 className="exclam">OOps!, Empty Cart.</h4>
      <a href="/menu">
        <button type="button" className="explore-btn">
          Explore Menu
        </button>
      </a>
    </div>
  </EmptyStyle>
);

const EmptyStyle = styled.div`
  width: 100% !important;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .exclam {
    font-size: 0.7em;
  }
  > div {
    width: 90% !important;
    display: grid;
    place-content: center;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    color: #000;
    margin-top: 2em;
    p {
      font-size: 16px;
    }
    img {
      width: 60%;
      height: 60%;
      margin: 0 auto;
    }
  }
  .explore-btn {
    outline: none;
    border: none;
    background: #fa5a00;
    color: #ffffff;
    font-weight: 400;
    font-size: 12px;
    line-height: 29px;
    border-radius: 3px;
    padding: 0.3em;
    width: 70%;
    margin-top: 1em;
  }
`;

export default EmptyCart;
