import { useState, useContext } from "react";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import { currencyFormatter } from "../utils/formatting";

export default function CartInfo() {
  const cartCtx = useContext(CartContext);

  function handleSelectPerson(id) {
    cartCtx.selectPerson(id);
  }

  return (
    <div id="cart-info">
      <h3>Riga - St. Petersburg</h3>
      <Button onClick={() => handleSelectPerson(0)} className="passenger-btn">
        {cartCtx.people[0].name}
      </Button>
      <Button onClick={() => handleSelectPerson(1)} className="passenger-btn">
        {cartCtx.people[1].name}
      </Button>
      <h3>Total price: € {cartCtx.totalPrice} </h3>
    </div>
  );
}
