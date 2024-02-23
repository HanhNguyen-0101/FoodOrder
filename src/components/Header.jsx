import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "./store/CartContext";
import UserProgessContext from "./store/UserProgessContext";

function Header() {
  const cartCtx = useContext(CartContext);
  const userProgessCtx = useContext(UserProgessContext);
  const totalCartItems = cartCtx.items.reduce((total, cartItem) => {
    return total += cartItem.quantity;
  }, 0);

  function handleShowCart() {
    userProgessCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly={true}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
