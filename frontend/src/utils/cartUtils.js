const addDec = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  export const updateCart = (state) => {
    state.itemsPrice = addDec(
        state.cartItems.reduce((acc, item) => {
          const price = Number(item.price);  // Ensure price is a number
          const qty = Number(item.qty) || 1; // Default to 1 if qty is invalid
          if (isNaN(price) || isNaN(qty)) {
            return acc; // Skip this item if price or qty is invalid
          }
          return acc + price * qty;
        }, 0)
      );

      state.totalPrice = (Number(state.itemsPrice) || 0).toFixed(2);
  
    localStorage.setItem("cart", JSON.stringify(state));
    
    return state;
  };
  