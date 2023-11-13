import beer from "../assets/beer.jpg";
import wine from "../assets/wine.jpg";
import juice from "../assets/juice.jpg";
import CartContext from "../store/CartContext";
import { useContext, useState } from "react";

export default function Drinks({ meal }) {
  const cartCtx = useContext(CartContext);
  const availableDrinks = meal.drinks;

  const [isSelected, setIsSelected] = useState(false);

  const imageStyle = {
    width: "30px",
    height: "30px",
    marginRight: "5px",
    marginBottom: "5px",
  };

  function handleDrinkSelection(drink) {
    setIsSelected((prevIsSelected) => !prevIsSelected);
    if (!isSelected) {
      cartCtx.addDrink(drink);
    } else {
      cartCtx.removeItem(drink.id);
    }
  }

  return (
    <div id="drink-selection" style={{ display: "flex", flexDirection: "row" }}>
      <img
        src={beer}
        alt="beer"
        style={imageStyle}
        onClick={() => handleDrinkSelection(availableDrinks[2])}
      />
      <img
        src={wine}
        alt="wine"
        style={imageStyle}
        onClick={() => handleDrinkSelection(availableDrinks[0])}
      />
      <img
        src={juice}
        alt="juice"
        style={imageStyle}
        onClick={() => handleDrinkSelection(availableDrinks[1])}
      />
    </div>
  );
}
