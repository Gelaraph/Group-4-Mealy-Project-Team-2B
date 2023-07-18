import React from "react";
import { useCart } from "react-use-cart";
import { histories } from "./data";
import uniqueId from "../../../component/uniqueId";
import "../style.css";
import Button from "../../../component/Button";
import EmptyPana from "../../../assets/Empty-pana.svg";

const Orders = () => {
  const { items, isEmpty } = useCart();

  return (
    <div className="main">
      <div className="orders flex">
        <div className="ongoing-orders flex">
          <h3 className="head-ord">Ongoing Orders</h3>
          {isEmpty ? (
            <div className="empty-order-cont">
              <img alt="" src={EmptyPana} className="empty-vector" />
              <p>You do not have any ongoing order yet.</p>
              <a href="/menu" className="order-explor-btn">
                <Button>Explore menu</Button>
              </a>
            </div>
          ) : (
            <div className="ongoing">
              {items.map((order) => (
                <div className="order-container flex" key={uniqueId(5)}>
                  <div className="order flex">
                    <div className="order-img">
                      <img src={order.imageUrl} alt="" />
                    </div>
                    <div className="order-texts flex">
                      <h5>{order.name}</h5>
                      <small>{order.description}</small>
                      <p>${order.price}</p>
                    </div>
                  </div>
                  <div className="order-btn">
                    <button type="submit">open</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="order-history flex">
          <h3 className="head-ord">Order History</h3>
          <div className="history">
            {histories.map((history) => (
              <div className="order-container flex" key={uniqueId(5)}>
                <div className="order flex">
                  <div className="order-img">
                    <img src={history.image} alt="" />
                  </div>
                  <div className="order-texts flex">
                    <h5>{history.name}</h5>
                    <p>
                      <small>{history.details}</small>
                    </p>
                    <p>
                      <small>{history.detail2}</small>
                    </p>
                    <p>{history.price}</p>
                  </div>
                </div>
                <div className="order-btn">
                  <button type="submit">{history.text}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
