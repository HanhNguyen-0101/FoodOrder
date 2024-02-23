import React, { useContext } from "react";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import CartContext from "./store/CartContext";
import { currency } from "../utils/currency";
import Button from "./UI/Button";
import UserProgessContext from "./store/UserProgessContext";
import useHttp from "./hook/useHttp";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
function Checkout() {
  const userProgessCtx = useContext(UserProgessContext);
  const cartCtx = useContext(CartContext);
  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    config
  );

  const totalPrice = cartCtx.items.reduce((total, item) => {
    return (total += item.quantity * item.price);
  }, 0);

  function handleCloseCheckout() {
    userProgessCtx.hideCheckout();
  }

  function handleSubmitOrder(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  function handleFinish() {
    userProgessCtx.hideCheckout();
    cartCtx.clearItems();
    clearData();
  }

  let actions = (
    <>
      <Button type="button" textOnly={true} onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgessCtx.userProgess === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <p className="modal-actions">
            <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgessCtx.userProgess === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmitOrder}>
        <h2>Checkout</h2>
        <p>Total Amount: {currency.format(totalPrice)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}

export default Checkout;
