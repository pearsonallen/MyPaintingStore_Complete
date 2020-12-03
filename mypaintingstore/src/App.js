import React, { useState } from "react";
import './style.scss';
import axios from 'axios';

function Painting(props) {
  const [quantity, setQuantity] = useState();
  const handleAdd = (e) => {
    e.preventDefault();
    props.addItem(props.name,quantity);
  }
  return (
    <div class="painting-container">
      <div class="painting-image">
        <img src="https://picsum.photos/200" alt="Chris's Wonderful Work" />
      </div>
      <div class="painting-info">
        <h2>{props.name}</h2>
        <p>{props.description}</p>
      </div>
      <div class="painting-action">
        <label>Quantity</label>
        <input type="text" class="addQuanitity" onChange={e => setQuantity(e.target.value)} />
        <button onClick={handleAdd} className="btn" >Add</button>
        <p class="counter"></p>
      </div>
      </div>
  )
}

function Cart(props) {
  return (
    <table>
      {props.orders.length > 0 && props.orders.map((order) => {
        return <tr><td>{order.name}</td><td>{order.quantity}</td></tr>
      })}
    </table>
  )
}

function App() {
  const [email, setEmail] = useState();
  const [orders, setOrders] = useState([]);

  const sendOrder = async () => {
    debugger;
    await axios.post(process.env.REACT_APP_API + "/InsertData",
    {
      email: email,
      orders: orders
    })
  }

  const handleAddItem = (itemName,quantity) => {
    setOrders([...orders, {name: itemName, quantity: quantity}]);
  }

  return (
    <div class="container">
      <h1>Chris's Paintings</h1>
    <div class="painting-cart">
      <div class="customer-info">
      <label for="email">Email</label>
      <input onChange={e => setEmail(e.target.value)} type="email" id="cust-email" />
      </div>
      <div class="cart-list">
        <Cart orders={orders} />
      </div>
      <div class="cart-actions">
        <button onClick={sendOrder} class="btn submit-order">Order</button>
      </div>
    </div>
    <section class="painting-listing">
      <ul>
        <li>
          <Painting name="fred" description="painting description" addItem={handleAddItem} />
        </li>
        <li>
          <Painting name="cathy" description="painting description" addItem={handleAddItem} />
        </li>
        <li>
          <Painting name="dave" description="painting description" addItem={handleAddItem} />
        </li>
      </ul>
      </section>
    </div>
  );
}

export default App;
