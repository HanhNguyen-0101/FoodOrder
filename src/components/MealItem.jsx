import React, { useContext } from "react";
import Button from "./UI/Button";
import { currency } from "../utils/currency";
import CartContext from "./store/CartContext";

function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currency.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => cartCtx.addItem(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
