import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./components/store/CartContext";
import { UserProgessContextProvider } from "./components/store/UserProgessContext";

function App() {
  return (
    <UserProgessContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgessContextProvider>
  );
}

export default App;
