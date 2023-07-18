/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const yesterday = moment().subtract(1, "day");
const valid = (current) => current.isAfter(yesterday);

const DateAndTime = ({ value, onChange }) => {
  const renderDay = (props, currentDate) => (
    <td {...props}>{`${currentDate.date()}`}</td>
  );
  const renderMonth = (props, month) => <td {...props}>{month}</td>;
  const renderYear = (props, year) => <td {...props}>{year % 100}</td>;
  return (
    <Datetime
      renderDay={renderDay}
      renderMonth={renderMonth}
      renderYear={renderYear}
      isValidDate={valid}
      value={value}
      onChange={onChange}
      input={false}
    />
  );
};

export default DateAndTime;
