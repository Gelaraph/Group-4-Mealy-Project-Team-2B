/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { useCart } from "react-use-cart";
import { ImCancelCircle } from "react-icons/im";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

import "./cartmodal.css";
import EmptyCart from "./EmptyCart";

const CartModal = ({ open, onClose }) => {
  const { items, isEmpty, updateItemQuantity, removeItem } = useCart();
  return (
    <OpenWrapper open={open}>
      <div className="cart-cancel-btn">
        <ImCancelCircle onClick={onClose} />
        <p>Cart</p>
      </div>
      <Wrapper>
        {isEmpty && <EmptyCart />}
        {!isEmpty && (
          <div>
            <div className="cart flex extras-scroll">
              {items.map((item) => (
                <div className="food flex" key={item.createdAt}>
                  <div className="price flex">
                    <div className="food-img">
                      <img src={item.imageUrl} alt="" />
                    </div>
                    <div className="food-texts flex">
                      <p>{item.name}</p>
                      <small>${item.price}</small>
                    </div>
                  </div>
                  <div className="food-number flex">
                    <div className="close-img">
                      <GrClose onClick={() => removeItem(item.id)} />
                    </div>
                    <div className="add flex">
                      <AiFillMinusCircle
                        className="plus icon-coloured"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      />
                      {item.quantity}
                      <AiFillPlusCircle
                        className="minus icon-coloured"
                        onClick={() =>
                          updateItemQuantity(item._id, item.quantity + 1)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cartmodal-btn-div">
              <a href="/checkout">
                <button type="button" className="cart-checkout-btn">
                  Checkout
                </button>
              </a>
            </div>
          </div>
        )}
      </Wrapper>
    </OpenWrapper>
  );
};

const OpenWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 134;
  background-color: #f8f8f8;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  width: 320px;
  transform: translateX(${({ open }) => (open ? "0px" : "320px")});
  transition: transform 0.5s;
  max-height: 99%;
  min-height: 75px;
  overflow-y: auto;
  border-radius: 0 0 0 20px;
  box-sizing: border-box;
  .cart-cancel-btn {
    display: flex;
    justify-content: space-between;
    padding-left: 1em;
    padding-right: 2em;
    margin-top: 1em;
    p {
      font-weight: 700;
      font-size: 18px;
    }
    svg {
      color: #fa5a00;
      cursor: pointer;
    }
  }
`;
const Wrapper = styled.div`
  padding: 5px 15px;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  .cart {
    margin-top: 1em;
    width: 95%;
    padding-bottom: 1em;
  }
  .food-texts small {
    text-align: start;
  }
  .food-number svg {
    cursor: pointer;
  }
  .cart-checkout-btn {
    outline: none;
    border: none;
    background: #fa5a00;
    color: #ffffff;
    font-weight: 400;
    font-size: 12px;
    line-height: 29px;
    border-radius: 3px;
    padding: 0.3em;
    width: 100%;
  }
  .cartmodal-btn-div {
    display: flex;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
    a {
      width: 100%;
    }
  }
`;

export default CartModal;
