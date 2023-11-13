import { useState, useContext } from "react";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import { currencyFormatter } from "../utils/formatting";

export default function CartInfo() {
  const cartCtx = useContext(CartContext);

  let totalPriceFormatted = cartCtx.totalPrice.toFixed(2);

  function handleSelectPerson(id) {
    cartCtx.selectPerson(id);
  }

  return (
    <div id="cart-info">
      <h3>
        <i className="fa fa-plane" aria-hidden="true"></i> Riga - St. Petersburg
      </h3>
      <Button onClick={() => handleSelectPerson(0)} className="passenger-btn">
        {cartCtx.people[0].name}
      </Button>
      <Button onClick={() => handleSelectPerson(1)} className="passenger-btn">
        {cartCtx.people[1].name}
      </Button>
      <h3>Total price: {currencyFormatter.format(totalPriceFormatted)} </h3>
    </div>
  );
}
