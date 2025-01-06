// CartReducer.js
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      // Check if the product already exists in the cart
      const existingProductIndex = state.cart.findIndex(item => item._id === action.payload._id);

      if (existingProductIndex !== -1) {
        // Product already exists, update the quantity
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      } else {
        // Product does not exist, add it to the cart
        return { ...state, cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }] };
      }

    case "REMOVE_ITEM":
      // Remove item from the cart
      return { ...state, cart: state.cart.filter(item => item._id !== action.payload._id) };

    case "UPDATE_ITEM_QUANTITY":
      // Update the quantity of a specific item
      const updatedCart = state.cart.map(item => 
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, cart: updatedCart };

    case "SET_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

export default cartReducer;
