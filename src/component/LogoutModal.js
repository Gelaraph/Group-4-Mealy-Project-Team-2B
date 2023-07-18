import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth, AuthDispatch } from "../utilities/auth";
import Button from "./Button";

const LogoutModal = () => {
  const { dispatch } = Auth();

  const history = useNavigate();

  const logout = () => {
    // console.log(user.user?.access_token)
    localStorage.getItem("token");
    // SignOut(token).then(() => {
    //   // dispatch action to remove user
    //   dispatch({
    //     type: AuthDispatch.SignOut,
    //   });
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("id");
    //   history("/");
    // });
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    dispatch({
      type: AuthDispatch.SignOut,
    });
    history("/");
  };

  return (
    <div className="logout-content-div">
      <p>you can always log back in at any time.</p>
      <div className="button-div">
        <Button className="logout-btn" type="submit" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LogoutModal;
