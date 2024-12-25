const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[itemIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        return { ...state, cart: [...state.cart, newItem] };
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case "UPDATE_ITEM_QUANTITY":
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, cart: updatedCart };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "SET_CART":
      return { ...state, cart: action.payload }; // Handle loading the cart from localStorage

    default:
      return state;
  }
};

export default cartReducer;
