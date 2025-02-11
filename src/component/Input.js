import React, { forwardRef } from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";

const Input = forwardRef(
  (
    // eslint-disable-next-line react/prop-types
    { className, id, name, value, onChange, placeholder, children, type },

    ref,
  ) => {
    const inputClassName = `input-component${className ? ` ${className}` : ""}`;

    return (
      <InputStyle>
        <input
          className={inputClassName}
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
        />
        {children}
      </InputStyle>
    );
  },
);

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  children: PropTypes.node,
};

Input.defaultProps = {
  className: "",
  placeholder: "",
  id: "",
  name: "",
  value: "",
  onChange: () => {},
  children: null,
};

const InputStyle = styled.div`
  .input-component {
    padding: 0.7rem;
    outline: none;
    border: 1px solid #32324d4f;
    border-radius: 5px;
    border: 1px solid #32324d4f;
    border-radius: 5px;
    background: #ffffff;
    border: 1px solid #bbbbc4;
    border-radius: 16px;
    width: 396px;
    height: 30px;
  }
  .input-component::-webkit-outer-spin-button,
  .input-component-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input-component::placeholder {
    opacity: 0.8;
    font-size: 0.8rem;
  }
`;

export default Input;
