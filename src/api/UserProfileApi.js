import { useState } from "react";

const uploadImageToken = localStorage.getItem("token");

export const updatePersonalInfo = async (personalInfo, token) => {
  try {
    const response = await fetch(
      "https://mealy.onrender.com/api/v1/user/profile/personalinfo",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(personalInfo),
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating personal info:", error);
    throw error;
  }
};

export const updateAddressInfo = async (addressInfo, token) => {
  try {
    const response = await fetch(
      "https://mealy.onrender.com/api/v1/user/profile/addressinfo",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressInfo),
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating address info:", error);
    throw error;
  }
};

export const uploadProfilePicture = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      "https://mealy.onrender.com/api/v1/user/profile/photo",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${uploadImageToken}`,
        },
        body: { file },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await fetch(
      "https://mealy.onrender.com/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

export default function UserProfileApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  return {
    isLoading,
    error,
    updatePersonalInfo,
    updateAddressInfo,
    uploadProfilePicture,
    getUserProfile,
  };
}
