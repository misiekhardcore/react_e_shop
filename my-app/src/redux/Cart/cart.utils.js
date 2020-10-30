export const existingCartItem = ({ prevCartItems, nextCartItem }) => {
  return prevCartItems.find(
    (cartItem) => cartItem.documentID === nextCartItem.documentID
  );
};

export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  const quantityIncrement = 1;
  const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });

  if (cartItemExists) {
    return prevCartItems.map((cartItem) =>
      cartItem.documentID === nextCartItem.documentID
        ? {
            ...cartItem,
            quantity: cartItem.quantity + quantityIncrement,
          }
        : cartItem
    );
  }

  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      quantity: quantityIncrement,
    },
  ];
};

export const handleSubtractFromCart = ({ prevCartItems, cartItem }) => {
  const existingCartItem = prevCartItems.find(
    (item) => item.documentID === cartItem.documentID
  );

  if (existingCartItem.quantity === 1) {
    return prevCartItems.filter(
      (item) => item.documentID !== existingCartItem.documentID
    );
  }

  return prevCartItems.map((item) =>
    item.documentID === existingCartItem.documentID
      ? {
          ...item,
          quantity: item.quantity - 1,
        }
      : item
  );
};

export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
  return prevCartItems.filter(
    (item) => item.documentID !== cartItemToRemove.documentID
  );
};
