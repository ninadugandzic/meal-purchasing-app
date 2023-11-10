import React, { createContext, useReducer } from "react";

const CartContext = createContext({
  selectedPersonId: null,
  people: [
    {
      id: 1,
      name: "Passenger 1",
      meals: [],
      selectedDrinks: [],
    },
    {
      id: 2,
      name: "Passenger 2",
      meals: [],
      selectedDrinks: [],
    },
  ],
  totalPrice: 0,
  addItem: (meal) => {},
  removeItem: (itemIndex) => {},
  selectPerson: (personId) => {},
  addDrink: (drink) => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { meal } = action;
      const { selectedPersonId } = state;
      const updatedPeople = [...state.people];
      const selectedPersonIndex = updatedPeople.findIndex(
        (person) => person.id === selectedPersonId
      );

      updatedPeople[selectedPersonIndex].meals.push(meal);

      state.totalPrice += meal.price;
      console.log(state.totalPrice);
      return { ...state, people: updatedPeople };
    }

    case "REMOVE_ITEM": {
      const { itemIndex } = action;
      const { selectedPersonId } = state;
      const updatedPeople = [...state.people];
      const selectedPersonIndex = updatedPeople.findIndex(
        (person) => person.id === selectedPersonId
      );

      updatedPeople[selectedPersonIndex].meals.splice(itemIndex, 1);
      return { ...state, people: updatedPeople };
    }

    case "SELECT_PERSON": {
      const selectedPersonId = action;
      return { ...state, selectedPersonId };
    }

    case "ADD_DRINK": {
      const { drink } = action;
      const { selectedPersonId } = state;
      const updatedPeople = [...state.people];
      const selectedPersonIndex = updatedPeople.findIndex(
        (person) => person.id === selectedPersonId
      );

      updatedPeople[selectedPersonIndex].selectedDrinks.push(drink);
      state.totalPrice += drink.price;
      console.log(state.totalPrice);
      return { ...state, people: updatedPeople };
    }

    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    selectedPersonId: 1,
    people: [
      {
        id: 1,
        name: "Passenger 1",
        meals: [],
        selectedDrinks: [],
      },
      {
        id: 2,
        name: "Passenger 2",
        meals: [],
        selectedDrinks: [],
      },
    ],
    totalPrice: 0,
  });

  const addItem = (meal) => {
    cartDispatch({ type: "ADD_ITEM", meal });
  };
  const removeItem = ({ itemIndex }) =>
    cartDispatch({ type: "REMOVE_ITEM", itemIndex });

  const selectPerson = (personId) =>
    cartDispatch({ type: "SELECT_PERSON", personId });

  const addDrink = (drink) => cartDispatch({ type: "ADD_DRINK", drink });

  const cartContext = {
    selectedPersonId: cartState.selectedPersonId,
    people: cartState.people,
    addItem,
    removeItem,
    selectPerson,
    addDrink,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
