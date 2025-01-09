const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingProductIndex = state.cart.findIndex(item => item._id === action.payload._id);

      if (existingProductIndex !== -1) {
        // Product already exists, update the quantity
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += 1; // Increase quantity by 1
        return { ...state, cart: updatedCart };
      } else {
        // Product does not exist, add it to the cart
        return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
      }

    case "REMOVE_ITEM":
      return { ...state, cart: state.cart.filter(item => item._id !== action.payload._id) };

    case "UPDATE_ITEM_QUANTITY":
      const updatedCartQuantity = state.cart.map(item => 
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, cart: updatedCartQuantity };

    case "SET_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

export default cartReducer;
