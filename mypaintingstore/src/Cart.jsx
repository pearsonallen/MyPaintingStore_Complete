function Cart(props) {
    return (
        <table>
            {props.orders.length > 0 && props.orders.map(order =>
                <tr>
                    <td>{order.name}</td>
                    <td>{order.quantity}</td>
                </tr>
            )}
        </table>
    )
}

export default Cart;