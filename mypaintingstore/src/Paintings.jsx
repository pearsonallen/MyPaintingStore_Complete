import { useState } from 'react';
import axios from 'axios';
import Cart from './Cart';
import Painting from './Painting';

function Store() {
    const [email, setEmail] = useState();
    const [orders, setOrders] = useState([]);

    const sendOrder = async () => {
        await axios.post(process.env.REACT_APP_API + "/InsertData",
            {
                email: email,
                orders: orders
            })
    }

    const handleAddItem = (itemName, quantity) => {
        setOrders([...orders, { name: itemName, quantity: quantity }]);
    }

    return (
        <div className="container">
            <h1>Chris's Paintings</h1>
            <div className="painting-cart">
                <div className="customer-info">
                    <label htmlFor="email">Email</label>
                    {/* 3 Talk about state methods */}
                    <input onChange={e => setEmail(e.target.value)} type="email" id="cust-email" />
                </div>
                {/* 2 Add Cart */}
                <div className="cart-list">
                    <Cart orders={orders} />
                </div>
                <div className="cart-actions">
                    <button onClick={sendOrder} className="btn submit-order">Order</button>
                </div>
            </div>
            <section className="painting-listing">
                <ul>
                    {/* 1 Add Painting Components */}
                    <Painting name="Red Elma" img="https://i.imgur.com/uVhng9d.jpg" description="Burning with anger, hidden behind a smile, this illustration shows a person that is angry on the inside." addItem={handleAddItem} />
                    <Painting name="Blue Pete" img="https://i.imgur.com/pxMrzis.jpg" description="The sorrow Pete feels is palpable.  His sadness exits his pores in a blue hue." addItem={handleAddItem} />
                    <Painting name="Green Bean" img="https://i.imgur.com/nhLiK1Q.jpg" description="Bean has turned green from all the vegetables he eats.  It's his attack on the monoculture of food in his country." addItem={handleAddItem} />
                    {/* Use these last 3 first because they don't have the handleAddItem method on the end */}
                    {/* <Painting name="Red Elma" img="https://i.imgur.com/uVhng9d.jpg" description="Burning with anger, hidden behind a smile, this illustration shows a person that is angry on the inside." />
            <Painting name="Blue Pete" img="https://i.imgur.com/pxMrzis.jpg" description="The sorrow Pete feels is palpable.  His sadness exits his pores in a blue hue." />
            <Painting name="Green Bean" img="https://i.imgur.com/nhLiK1Q.jpg" description="Bean has turned green from all the vegetables he eats.  It's his attack on the monoculture of food in his country." /> */}
                </ul>
            </section>
        </div >

    );
}

export default Store;