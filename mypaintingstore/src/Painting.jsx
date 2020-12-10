import { useState } from 'react';

function Painting(props) {
    const [quantity, setQuantity] = useState();

    const handleAdd = () => {
        props.addItem(props.name, quantity);
    }

    return (
        <li>
            <div className="painting-container">
                <div className="painting-image">
                    <img src={props.img} alt="Chris's Wonderful Work" />
                </div>
                <div className="painting-info">
                    <h2>{props.name}</h2>
                    <p>{props.description}</p>
                </div>
                <div className="painting-action">
                    <label>Quantity</label>
                    <input type="text" className="addQuanitity" onChange={e => setQuantity(e.target.value)} />
                    <button onClick={handleAdd} className="btn" >Add</button>
                    <p className="counter"></p>
                </div>
            </div>
        </li>
    )
}

export default Painting;