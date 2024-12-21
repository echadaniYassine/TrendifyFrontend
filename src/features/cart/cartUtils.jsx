export const getCartTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartItemCount = (cart) => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};
