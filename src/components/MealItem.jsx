import React, { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import Drinks from "./Drinks";
import "./MealItem.css";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleSelectMeal(meal) {
    cartCtx.addItem(meal);
  }

  return (
    <>
      <li id="meal-item">
        {<img src={meal.img} alt={meal.title} />}
        <article id="meal-info">
          <h2>{meal.title}</h2>
          <p>
            <span className="bold">Starter:</span> {meal.starter}
          </p>
          <p>
            <span className="bold">Dessert:</span> {meal.desert}
          </p>
          <p>
            <span className="bold">Selected drink:</span>
          </p>
          <Drinks meal={meal} />
        </article>
        <div id="select-area">
          {<p className="price">{currencyFormatter.format(meal.price)}</p>}
          <Button
            className="select-button"
            onClick={() => handleSelectMeal(meal)}
          >
            Select
          </Button>
        </div>
      </li>
    </>
  );
}
