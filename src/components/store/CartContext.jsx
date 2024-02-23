import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearItems: () => {},
});

export function CartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedItems = [...state.items];

      const index = updatedItems.findIndex((i) => i.id === action.item.id);

      if (index > -1) {
        const updatedItem = { ...updatedItems[index] };
        (updatedItem.quantity += 1), (updatedItems[index] = updatedItem);
      } else {
        updatedItems.push({
          ...action.item,
          quantity: 1,
        });
      }
      return {
        ...state,
        items: updatedItems,
      };
    }
    case "REMOVE_ITEM": {
      const updatedItems = [...state.items];

      const index = updatedItems.findIndex((i) => i.id === action.id);

      if (index > -1) {
        const updatedItem = { ...updatedItems[index] };

        if (updatedItem.quantity === 1) {
          updatedItems.splice(index, 1);
        } else {
          updatedItem.quantity -= 1;
          updatedItems[index] = updatedItem;
        }
      }

      return {
        ...state,
        items: updatedItems,
      };
    }
    case "CLEAR_ITEM": {
      return {
        ...state,
        items: [],
      }
    }
    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(CartReducer, {
    items: []
  });

  function addItem(item) {
    cartDispatch({
      type: "ADD_ITEM",
      item,
    });
  }

  function removeItem(id) {
    cartDispatch({
      type: "REMOVE_ITEM",
      id,
    });
  }

  function clearItems() {
    cartDispatch({
      type: "CLEAR_ITEM",
    });
  }

  const cartContext = {
    items: cartState.items,
    addItem,
    removeItem,
    clearItems,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
