/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from "react";

const ErrorBoundary = (props) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      // You can log the error or perform any additional actions here.
      console.error("Something went wrong.");
    }
  }, [hasError]);

  const componentDidCatch = (error, errorInfo) => {
    setHasError(true);
  };

  if (hasError) {
    // Return a fallback UI when an error occurs.
    return <h1>Something went wrong.</h1>;
  }

  return props.children;
};

export default ErrorBoundary;
