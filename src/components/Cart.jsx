import React, { useContext } from "react";
import Modal from "./UI/Modal";
import UserProgessContext from "./store/UserProgessContext";
import CartContext from "./store/CartContext";
import { currency } from "../utils/currency";
import Button from "./UI/Button";
import CartItem from "./CartItem";

function Cart() {
  const userProgessCtx = useContext(UserProgessContext);
  const cartCtx = useContext(CartContext);

  const totalPrice = cartCtx.items.reduce((total, item) => {
    return (total += item.quantity * item.price);
  }, 0);

  function handleCloseCart() {
    userProgessCtx.hideCart();
  }

  function handleIncrease(item) {
    cartCtx.addItem(item);
  }

  function handleDecrease(id) {
    cartCtx.removeItem(id);
  }

  function handleGoToCheckout() {
    userProgessCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgessCtx.userProgess === "cart"}
      onClose={userProgessCtx.userProgess === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => handleIncrease(item)}
            onDecrease={() => handleDecrease(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currency.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly={true} onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
      </p>
    </Modal>
  );
}

export default Cart;
