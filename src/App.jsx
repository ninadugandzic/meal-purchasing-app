import { useState } from "react";
import Meals from "./components/Meals";
import CartInfo from "./components/CartInfo";
import { CartContextProvider } from "./store/CartContext";
import "./App.css";

function App() {
  return (
    <>
      <CartContextProvider>
        <div id="main-container">
          <Meals />
          <CartInfo />
        </div>
      </CartContextProvider>
    </>
  );
}

export default App;
