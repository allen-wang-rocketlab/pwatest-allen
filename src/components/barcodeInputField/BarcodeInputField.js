import React, { useState } from "react";

const BarcodeInputField = (props) => {
  const [enteredProduct, setEnteredProduct] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    // API product search
  }

  const onInputChange = (e) => {
    setEnteredProduct(e.target.value);
  }

  return <form onSubmit={onSubmit}>
    <input placeholder="123123123123" required type="number" onChange={onInputChange} />
    <button type="submit">Find</button>
  </form>
}

export default BarcodeInputField;
