import { createContext, useState } from "react";

const UserProgessContext = createContext({
    userProgess: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

export function UserProgessContextProvider({children}) {

    const [userProgess, setUserProgess] = useState('');
    function showCart() {
        setUserProgess('cart');
    }
    function hideCart() {
        setUserProgess('');
    }
    function showCheckout() {
        setUserProgess('checkout');
    }
    function hideCheckout() {
        setUserProgess('');
    }
    const userProgessContext = {
        userProgess,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }
    return <UserProgessContext.Provider value={userProgessContext}>{children}</UserProgessContext.Provider>
}

export default UserProgessContext;