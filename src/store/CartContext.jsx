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
  removeDrink: (itemIndex) => {},
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
      return { ...state, people: updatedPeople };
    }

    case "REMOVE_ITEM": {
      const { itemIndex } = action;
      const { selectedPersonId } = state;
      const updatedPeople = [...state.people];
      let updatedPrice = state.totalPrice;
      const selectedPersonIndex = updatedPeople.findIndex(
        (person) => person.id === selectedPersonId
      );

      const selectedItemIndex = updatedPeople[
        selectedPersonIndex
      ].meals.findIndex((item) => item.id === itemIndex);

      updatedPrice -=
        updatedPeople[selectedPersonIndex].meals[selectedItemIndex].price;

      console.log(updatedPrice);

      updatedPeople[selectedPersonIndex].meals.splice(selectedItemIndex, 1);

      return { ...state, people: updatedPeople, totalPrice: updatedPrice };
    }

    case "SELECT_PERSON": {
      const selectedPersonId = action;
      return { ...state, selectedPersonId: selectedPersonId.personId + 1 };
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
      return { ...state, people: updatedPeople };
    }

    case "REMOVE_DRINK": {
      const { itemIndex } = action;
      const { selectedPersonId } = state;
      const updatedPeople = [...state.people];
      let updatedPrice = state.totalPrice;
      const selectedPersonIndex = updatedPeople.findIndex(
        (person) => person.id === selectedPersonId
      );

      const selectedItemIndex = updatedPeople[
        selectedPersonIndex
      ].selectedDrinks.findIndex((item) => item.id === itemIndex);

      updatedPrice -=
        updatedPeople[selectedPersonIndex].selectedDrinks[selectedItemIndex]
          .price;

      updatedPeople[selectedPersonIndex].selectedDrinks.splice(
        selectedItemIndex,
        1
      );
      return { ...state, people: updatedPeople, totalPrice: updatedPrice };
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
  const removeItem = (itemIndex) =>
    cartDispatch({ type: "REMOVE_ITEM", itemIndex });

  const selectPerson = (personId) =>
    cartDispatch({ type: "SELECT_PERSON", personId });

  const addDrink = (drink) => cartDispatch({ type: "ADD_DRINK", drink });

  const removeDrink = (itemIndex) =>
    cartDispatch({ type: "REMOVE_DRINK", itemIndex });

  const cartContext = {
    selectedPersonId: cartState.selectedPersonId,
    people: cartState.people,
    totalPrice: cartState.totalPrice,
    addItem,
    removeItem,
    selectPerson,
    addDrink,
    removeDrink,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
