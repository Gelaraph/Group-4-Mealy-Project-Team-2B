/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const SnackbarComponent = ({ message }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SnackbarStyle>
      {open && (
        <div className="snackbar">
          <div className="snackbar-message">
            <IoMdCheckmarkCircleOutline />
            <p>{message}</p>
          </div>
        </div>
      )}
    </SnackbarStyle>
  );
};

const SnackbarStyle = styled.div`
  .snackbar {
    position: fixed;
    top: 100px;
    left: 55%;
    transform: translateX(-50%);
    background-color: rgb(250, 90, 0);
    color: white;
    padding: 16px 24px;
    border-radius: 4px;
    z-index: 9999;
  }

  .snackbar-message {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    column-gap: 2em;
    align-items: center;
    color: #ffffff;
    p {
      margin-bottom: 0;
    }
  }
`;

export default SnackbarComponent;
