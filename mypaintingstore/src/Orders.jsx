import axios from 'axios';
import React, { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/GetData").then(response => {
      setOrders(response.data)
    })
  },[])

  return (
    <div className="orderMain">
      <h1>My Orders</h1>
    <table style={{border: "1px solid black"  }}>

      <thead><th style={{border: "1px solid black"  }}>Email</th>
      <th style={{border: "1px solid black"  }}>Order Information</th></thead>
      <tbody>
        {orders.map((order) => 
          <tr>
            <td style={{border: "1px solid black"  }}>{order.Email._}</td>
            <td style={{border: "1px solid black"  }}>{JSON.parse(order.Orders._).map((o) => 
              <div>Name: {o.name} Quantity: {o.quantity}</div>
            )}</td>
            </tr>
        )}
        </tbody>
    </table>
    </div>
  )
}

export default Orders;