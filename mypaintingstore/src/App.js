import React, { useEffect, useState } from "react";
import './style.scss';
import axios from 'axios';
import Orders from './Orders';

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

function BuyOrders() {
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
    debugger;
    setOrders([...orders, {name: itemName, quantity: quantity}]);
  }

  return (
    <div class="container">
      <h1>Chris's Paintings</h1>
    <div class="painting-cart">
      <div class="customer-info">
      <label for="email">Email</label>
      {/* 3 Talk about state methods */}
      <input onChange={e => setEmail(e.target.value)} type="email" id="cust-email" />
      </div>
      {/* 2 Add Cart */}
      <div class="cart-list">
        <Cart orders={orders} />
      </div>
      <div class="cart-actions">
        <button onClick={sendOrder} class="btn submit-order">Order</button>
      </div>
    </div>
    <section class="painting-listing">
      <ul>
        {/* 1 Add Painting Components */}
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

function App() {
  const [distance, setDistance] = useState(0);
  const [currentView, setCurrentView] = useState(1);
  const viewMain = () => {
    setCurrentView(1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(process.env.REACT_APP_API + "/GetDistance").then((response) => {
        setDistance(response.data);
      });
    }, 1000);
    return () => clearInterval(interval);
    
  },[])

  const viewOrders = () => {
    setCurrentView(2);
  }
  return (
    <div>
    <div class="rightAlignNav">
      <button onClick={viewMain}>View Main</button>
      <button onClick={viewOrders}>View Orders</button>
    </div>
    <div className="distance">
      {distance}
    </div>
    {(currentView === 1) && <BuyOrders />}
    {(currentView === 2) && <Orders />}
  </div>
  );
}

export default App;
