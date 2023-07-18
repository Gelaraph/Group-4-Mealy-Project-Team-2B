import React from "react";
import styled from "styled-components";
import Button from "../../../component/Button";
import edit from "../../../assets/images/edit.svg";
import GreyRectangle from "../../../assets/images/grey-Rectangle.png";
import "../style.css";

const Delete = () => (
  <DeleteStyles>
    <div className="main">
      <div className="delete-container flex">
        <div className="delete-data-container flex">
          <h3>Delete Account and Data</h3>
          <p>
            In accordance with our privacy policy, deleting your account and
            data can’t be undone, so we need to verify it’s you before going
            ahead.
          </p>
          <p>Send us a request and you will ba sent a verification token.</p>
        </div>

        <div className="send-request-container">
          <div className="second-innerdiv flex">
            <img src={edit} alt="" className="edit-icon" />
            <img src={GreyRectangle} alt="" className="rectangle" />
          </div>
          <div className="delete-button-div">
            <Button className="delete-button" type="submit">
              Send request
            </Button>
          </div>
        </div>
      </div>
    </div>
  </DeleteStyles>
);

const DeleteStyles = styled.div`
  .second-innerdiv {
    align-items: start;
    justify-content: center;
    column-gap: 1em;
  }

  .edit-icon {
    width: 24px;
    cursor: pointer;
  }

  .rectangle {
    width: 70%;
    height: 300px;
  }
  .delete-button {
    margin-left: 3em;
  }
`;
export default Delete;
