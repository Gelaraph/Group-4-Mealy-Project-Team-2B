/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import {
  getUserProfile,
  updatePersonalInfo,
  updateAddressInfo,
  uploadProfilePicture,
} from "../../../api/UserProfileApi";
import Modal from "../../../component/Modal";
import Input from "../../../component/Input";
import edit from "../../../assets/images/profile-edit-pen.png";
import Button from "../../../component/Button";
import "../style.css";
import SnackbarComponent from "../../../component/Snackbar";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressEditing, setIsAddressEditing] = useState(false);
  const [country, setCountry] = useState("");
  const [cityState, setCityState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [deleteAccount, setDeleteAccount] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [showImageSaveButton, setShowImageSaveButton] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const token = localStorage.getItem("token");

  const handleDeleteClick = () => {
    setDeleteAccount(true);
  };
  const handleLogoutModal = () => {
    setDeleteAccount(false);
  };

  const handleDeleteRequestClick = async () => {
    try {
      setLoading(true);
      // Make a request to the delete request endpoint
      await axios.post(
        "https://mealy.onrender.com/api/v1/user/deleterequest",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Navigate the user to the token input route
      navigate("/delete-account-verification");
    } catch (error) {
      // console.log("Error deleting account:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleAddressEditClick = () => {
    setIsAddressEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const personalInfo = {
        firstName,
        lastName,
        phone,
      };
      await updatePersonalInfo(personalInfo, token);
      setShowSnackbar(true);
      console.log("true");
    } catch (error) {
      console.error("Error updating personal info:", error);
    }
  };

  const handleAddressSaveClick = async () => {
    setIsAddressEditing(false);
    try {
      const addressInfo = {
        countryName: country,
        cityAndState: cityState,
        numberAndStreet: street,
        postalCode,
      };
      await updateAddressInfo(addressInfo, token);
      setShowSnackbar(true);
    } catch (error) {
      // console.error("Error updating address info:", error);
    }
  };

  const handleImageUpload = async () => {
    try {
      await uploadProfilePicture(image);
      setShowImageSaveButton(false);
    } catch (error) {
      // console.error("Error updating image info:", error);
    }
  };

  const data = {
    name: "Gela Raphael",
    email: "angelaraph12@gmail.com",
    isVerified: true,
    // ... other properties
    profilePhoto: "", // Assuming this is the URL of the profile image
  };

  useEffect(() => {
    if (data.profilePhoto) {
      setImage(data.profilePhoto);
    }
  }, []);

  const handleImageInput = (event) => {
    const uploadedImage = event.target.files[0];
    setImage(uploadedImage);
    setShowImageSaveButton(true);
  };

  useEffect(() => {
    // Fetch user profile data on component mount
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile(token);

        setFirstName(profileData.data?.name);
        setLastName(profileData.data?.lastName);
        setPhone(profileData.data?.phone);
        setCountry(profileData.data?.countryName);
        setCityState(profileData.data?.cityAndState);
        setStreet(profileData.data?.numberAndStreet);
        setPostalCode(profileData.data?.postalCode);
        setEmail(profileData.data?.email);
      } catch (error) {
        // console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <ProfileStyles>
      <div className="main">
        <div className="profile-container flex">
          <div className="profile-image-container flex cont-border">
            <div className="image-upload-cont">
              {image ? (
                <img src={image} alt="" className="profile-image" />
              ) : (
                <BsPersonCircle className="no-picture-icon" />
              )}
            </div>

            <div>
              <div className="profile-name-location-div">
                <p className="user-name">{`${
                  firstName?.split(" ")[0]
                } ${lastName}`}</p>

                <p className="user-saved-location">
                  {`${cityState && cityState.length > 0 ? cityState : ""} ${
                    country && country.length > 0 ? country : ""
                  }`}
                </p>
              </div>

              <div className="add-img-container">
                {showImageSaveButton && (
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="save-img-btn">
                    Save
                  </button>
                )}
                <div>
                  <label
                    htmlFor="image-input"
                    type="button"
                    className="add-img-btn">
                    Add image
                  </label>
                  <input
                    style={{ display: "none" }}
                    id="image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageInput}
                    // onChange={saveFile}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="cont-border flex">
            <div className="personal-information-header flex">
              <h3>Personal Information</h3>
              <img
                src={edit}
                alt=""
                className="profile-edit-icon"
                onClick={handleEditClick}
              />
            </div>

            <div className="personal-information-edit flex">
              <div>
                <div>
                  <p>First Name</p>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={`${firstName?.split(" ")[0]}`}
                      className="edit-input"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  ) : (
                    <h4>{`${firstName?.split(" ")[0]}`}</h4>
                  )}
                </div>

                <div>
                  <p>Email address</p>
                  <h4 className={isEditing ? "greyed-out" : ""}>{email}</h4>
                </div>
              </div>

              <div>
                <div>
                  <p>Last Name</p>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={lastName}
                      className="edit-input"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  ) : (
                    <h4>
                      {`${lastName && lastName.length > 0 ? lastName : ""}`}
                    </h4>
                  )}
                </div>

                <div>
                  <p>Phone</p>
                  {isEditing ? (
                    <Input
                      type="tel"
                      className="edit-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  ) : (
                    <h4>{`${phone && phone.length > 0 ? phone : ""}`}</h4>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="edit-save-btn-div flex">
                <Button
                  onClick={handleSaveClick}
                  type="submit"
                  className="edit-save-btn">
                  save
                </Button>
              </div>
            )}
          </div>

          <div className="flex cont-border">
            <div className="personal-information-header flex">
              <h3>Addresses</h3>
              <img
                src={edit}
                alt=""
                className="profile-edit-icon"
                onClick={handleAddressEditClick}
              />
            </div>

            <div className="personal-information-edit flex">
              <div>
                <div>
                  <p>Country</p>
                  {addressEditing ? (
                    <Input
                      type="text"
                      className="edit-input"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  ) : (
                    <h4>{`${country && country.length > 0 ? country : ""}`}</h4>
                  )}
                </div>

                <div>
                  <p>Street/Number</p>
                  {addressEditing ? (
                    <Input
                      type="text"
                      className="edit-input"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  ) : (
                    <h4>{`${street && street.length > 0 ? street : ""}`}</h4>
                  )}
                </div>
              </div>

              <div>
                <div>
                  <p>City/State</p>
                  {addressEditing ? (
                    <Input
                      type="text"
                      className="edit-input"
                      value={cityState}
                      onChange={(e) => setCityState(e.target.value)}
                    />
                  ) : (
                    <h4>
                      {`${cityState && cityState.length > 0 ? cityState : ""}`}
                    </h4>
                  )}
                </div>

                <div>
                  <p>Postal Code</p>
                  {addressEditing ? (
                    <Input
                      type="text"
                      className="edit-input"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  ) : (
                    <h4>
                      {`${postalCode && postalCode}`}
                      {/* {`${
                        postalCode && postalCode.length > 0 ? postalCode : ""
                      }`} */}
                    </h4>
                  )}
                </div>
              </div>
            </div>
            {addressEditing && (
              <div className="edit-save-btn-div flex">
                <Button
                  onClick={handleAddressSaveClick}
                  type="submit"
                  className="edit-save-btn">
                  save
                </Button>
              </div>
            )}
          </div>

          <div className="delete-account-div" onClick={handleDeleteClick}>
            <p>Delete Account</p>
          </div>
        </div>
        {deleteAccount && (
          <Modal title="Delete Account?" onCloseModal={handleLogoutModal}>
            <div className="delete-modal-content">
              <p>
                In accordance with our privacy policy, deleting your account and
                data can’t be undone, so we need to verify it’s you before going
                ahead.
              </p>
              <p>
                Send us a request and you will ba sent a verification token.
              </p>
              <Button onClick={handleDeleteRequestClick}>
                {loading ? "Sending..." : "Send Request"}
              </Button>
            </div>
          </Modal>
        )}

        {showSnackbar && (
          <SnackbarComponent message="Settings successfully updated" />
        )}
      </div>
    </ProfileStyles>
  );
};

const ProfileStyles = styled.div`
  color: #000000;
  .personal-information-header {
    justify-content: space-between;
    h3,
    .user-name {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
    }
  }

  .personal-information-header h3,
  .user-name {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }

  .profile-image-container img {
    flex-direction: row !important;
    cursor: pointer;
  }
  .profile-image-container {
    gap: 2em;
    flex-direction: row !important;
  }
  .profile-name-location-div {
    margin-top: 0.5em;
    text-align: start !important;
  }
  .personal-information-edit {
    column-gap: 5em;
    align-items: center;
    h4 {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
    }
  }
  .user-saved-location,
  .personal-information-edit p {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  .profile-edit-icon {
    width: 50px;
    height: 30px;
    cursor: pointer;
  }
  .personal-information-edit > div > div {
    margin-bottom: 1em;
  }
  .greyed-out {
    color: #999999;
  }
  .edit-input {
    margin-top: 1em;
    width: 300px;
  }
  .edit-save-btn-div {
    justify-content: flex-end;
    .edit-save-btn {
      width: 100px;
    }
  }
  .delete-account-div {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  }
  .delete-modal-content {
    margin-top: 0.5em;
    text-align: center;
    align-items: center;
    display: grid;
    place-items: center;
    p {
      color: #000000;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 1em;
    }
  }

  #upload-input {
    position: absolute;
    width: 10px;
  }
  .profile-image {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
  .add-img-btn,
  .save-img-btn {
    background: #fa5a00;
    color: #ffffff;
    outline: none;
    border: none;
    width: 100px;
    padding: 0.5em;
    border-radius: 3px;
    height: 30px;
    font-size: 14px;
    cursor: pointer;
  }
  .save-img-btn {
    /* margin-top: 1.3em; */
  }
  .no-picture-icon {
    font-size: 60px;
    color: #999999;
  }
  #image-input {
    position: absolute;
    margin-left: -8em;
  }
  .add-img-container {
    margin-top: 2em;
    align-items: center;
    display: flex;
    justify-content: space-between;
    column-gap: 1em;
  }
  @media (max-width: 1051px) {
    .personal-information-edit {
      display: grid;
      place-items: center;
      > div {
        width: 100%;
      }
      p,
      h4 {
        font-size: 16px;
      }
      .edit-input {
        margin-top: 0.3em;
      }
    }
  }
  @media (max-width: 645px) {
    .edit-input {
      width: 100%;
    }
  }
`;
export default Profile;
