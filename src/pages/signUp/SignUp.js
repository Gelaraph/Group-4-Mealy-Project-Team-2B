import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apple from "../../assets/images/apple 1.svg";
import google from "../../assets/images/google 1.svg";
import facebook from "../../assets/images/facebook 1.svg";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { RightSideImage } from "../authPageBgImg";
import { FormValidationContext } from "../../hooks/UseFormValidationsContext";
import UseAuth from "../../hooks/useAuth";
import "../authPagesStyles.css";
import "./style.css";

const SignUp = () => {
  const [requestSuccess, setRequestSuccess] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const history = useNavigate();

  const { isLoading, error, signUp } = UseAuth();

  const {
    name,
    setName,
    nameError,
    validateName,
    email,
    setEmail,
    emailError,
    validateEmail,
    password,
    setPassword,
    passwordError,
    validatePassword,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    validateConfirmPassword,
    validateAgreeChecked,
    agreeChecked,
    agreeCheckedError,
    setAgreeChecked,
    setNameError,
    setEmailError,
    setPasswordError,
    setConfirmPasswordError,
    setAgreeCheckedError,
    receivePromotionalEmails,
    setReceivePromotionalEmails,
  } = useContext(FormValidationContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableBtn(true);
    const isFirstNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isAgreeCheckedValid = validateAgreeChecked();

    if (
      isFirstNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isAgreeCheckedValid
    ) {
      signUp({
        name,
        email,
        password,
        confirmPassword,
        receivePromotionalEmails,
      }).then((response) => {
        setRequestSuccess(response.status);
        setNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setAgreeCheckedError("");
      });
    }
  };

  useEffect(() => {
    if (requestSuccess) {
      history("/sign-up-verification");
      // getUser(email).then(() => {
      //   history("/sign-up-verification");
      // })
    } else {
      setDisableBtn(false);
    }
  });

  return (
    <div className="sign-up-page">
      <div className="left-side">
        <a href="/">
          <header className="logo-header signup-header">
            <h1>Mealy</h1>
          </header>
        </a>

        <form className="input-wrapper" onSubmit={handleSubmit}>
          <div className="signup-form-title">
            <h2>Create an Account</h2>
          </div>

          <div className="input-div input-cont">
            <Input
              type="text"
              id="first name"
              placeholder="First Name"
              className="input-width"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="validation-error-div">
              {nameError && (
                <span className="validation-error">{nameError}</span>
              )}
            </div>
          </div>

          <div className="input-div input-cont">
            <Input
              type="email"
              id="email"
              placeholder="Email"
              className="input-width"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="validation-error-div">
              {emailError && (
                <span className="validation-error">{emailError}</span>
              )}
            </div>
          </div>

          <div className="input-div input-cont">
            <Input
              type="password"
              id="password"
              placeholder="Password"
              className="input-width"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="validation-error-div">
              {passwordError && (
                <span className="validation-error">{passwordError}</span>
              )}
            </div>
          </div>

          <div className="input-div input-cont">
            <Input
              type="password"
              id="forget-password"
              placeholder="Confirm Password"
              className="input-width"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="validation-error-div">
              {confirmPasswordError && (
                <span className="validation-error">{confirmPasswordError}</span>
              )}
            </div>
          </div>

          <div className="checkboxes">
            <div className="first-checkbox">
              <input
                type="checkbox"
                id="discount"
                checked={receivePromotionalEmails}
                onChange={(e) => setReceivePromotionalEmails(e.target.checked)}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="discount" className="checkbox-label">
                I want to receive discounts, loyalty offers and other updates.
              </label>
            </div>

            <div className="second-checkbox">
              <input
                type="checkbox"
                id="agree"
                checked={agreeChecked}
                onChange={(e) => setAgreeChecked(e.target.checked)}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="agree" className="checkbox-label">
                Yes, I understand and agree to Mealy’s Terms of service
              </label>
              <div className="validation-error-div">
                {agreeCheckedError && (
                  <span className="validation-error">{agreeCheckedError}</span>
                )}
              </div>
            </div>
          </div>

          <div className="create-acc-btn">
            <div className="error-message endpoint-error">{error}</div>
            <Button
              type="submit"
              className="input-width"
              style={
                disableBtn
                  ? { opacity: "0.6", cursor: "not-allowed" }
                  : { opacity: "1" }
              }>
              {isLoading ? "Signing Up..." : "Create an account"}
            </Button>
          </div>
        </form>

        <div className="button-icons-div">
          <p>Sign up using</p>
          <div className="icons">
            <img src={apple} alt="apple-icon" />
            <img src={google} alt="google-icon" />
            <img src={facebook} alt="facebook-icon" />
          </div>

          <p className="sign-in-link">
            Already have an account?
            <a href="sign-In" className="sign-up-link">
              Sign In
            </a>
          </p>
        </div>
      </div>
      <RightSideImage />
    </div>
  );
};

export default SignUp;

// const Contact = () => {
//   const [requestSuccess, setRequestSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

  // const {
  //   name,
  //   setName,
  //   nameError,
  //   validateName,
  //   email,
  //   setEmail,
  //   emailError,
  //   validateEmail,
  //   setNameError,
  //   setEmailError,
  //   phoneNumber,
  //   setPhoneNumber,
  //   phoneNumberError,
  //   setPhoneNumberError,
  //   validatePhoneNumber,
  // } = useContext(FormValidationContext);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const isNameValid = validateName();
  //   const isEmailValid = validateEmail();
  //   const isPhoneNumberValid = validatePhoneNumber();

  //   if (isNameValid && isEmailValid && isPhoneNumberValid) {
  //     alert("msg sent");
  //   }
  //   setLoading(false);
  //   setNameError("");
  //   setEmailError("");
  //   setPhoneNumberError("");
  // };

//   return (
//     <Layout>
      // <div className="contact-wrapper">
      //   <div className="contact-header">
      //     <h1>Contact us</h1>
      //   </div>
      //   <div className="contact-container">
      //     <div className="form">
      //       <div className="contact-info">
      //         <h3 className="title">Let&apos;s get in touch</h3>
      //         <p className="text">
      //           For urgent matters related to Mealy Delivery or Mealy Pickup
      //           orders, please contact the Mealy Customer Care Center at:
      //         </p>

      //         <div className="info">
      //           <div className="information">
      //             <GoLocation className="icon" />{" "}
      //             <p> Mile End Rd, Bethnal Green, London E1 4NS</p>
      //           </div>
      //           <div className="information">
      //             <AiOutlineMail className="icon" />
      //             <p>hellomealy@gmail.com</p>
      //           </div>
      //           <div className="information">
      //             <BsTelephoneInbound className="icon" />
      //             <p>123-456-789</p>
      //           </div>
      //         </div>

      //         <div className="social-media">
      //           <p>Connect with us :</p>
      //           <div className="social-icons">
      //             <a className="linkedin" href="/">
      //               <BsLinkedin />
      //             </a>
      //             <a className="twitter" href="/">
      //               <AiFillTwitterSquare />
      //             </a>
      //             <a className="instagram" href="/">
      //               <FaInstagram />
      //             </a>
      //             <a className="facebook" href="/">
      //               <FaFacebookSquare />
      //             </a>
      //           </div>
      //         </div>
      //       </div>

      //       <div className="contact-form">
      //         <form onSubmit={handleSubmit}>
      //           <h3 className="title">Send a message</h3>
      //           <div className="input-container">
      //             <input
      //               type="text"
      //               name="name"
      //               className="contact-input"
      //               placeholder="Name"
      //               value={name}
      //               onChange={(e) => setName(e.target.value)}
      //             />
      //             <div className="validation-error-div">
      //               {nameError && (
      //                 <span className="validation-error">{nameError}</span>
      //               )}
      //             </div>
      //           </div>
      //           <div className="input-container">
      //             <input
      //               type="email"
      //               name="email"
      //               className="contact-input"
      //               placeholder="Email"
      //               value={email}
      //               onChange={(e) => setEmail(e.target.value)}
      //             />
      //             <div className="validation-error-div">
      //               {emailError && (
      //                 <span className="validation-error">{emailError}</span>
      //               )}
      //             </div>
      //           </div>
      //           <div className="input-container">
      //             <input
      //               type="tel"
      //               name="phone"
      //               className="contact-input"
      //               placeholder="Phone Number"
      //               value={phoneNumber}
      //               onChange={(e) => setPhoneNumber(e.target.value)}
      //             />
      //             <div className="validation-error-div">
      //               {phoneNumberError && (
      //                 <span className="validation-error">
      //                   {phoneNumberError}
      //                 </span>
      //               )}
      //             </div>
      //           </div>
      //           <div className="input-container textarea">
      //             <textarea
      //               name="message"
      //               className="contact-input"
      //               placeholder="type text here..."
      //             />
      //           </div>
      //           <div className="contact-send-div flex">
      //             <button type="submit" className="btn flex">
      //               {loading ? "Sending..." : "    Send"}
      //             </button>
      //           </div>
      //         </form>
      //       </div>
      //     </div>
      //   </div>
      // </div>
//     </Layout>
//   );
// };
// export default Contact;
