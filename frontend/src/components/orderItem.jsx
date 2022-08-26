import { useEffect, useRef } from "react"

export default function OrderItem(props) {
    return (
        <tr>
            <td>
                <img src={props.order.product.pictures[0]} alt="" style={{ width: '5rem' }} />
            </td>
            <td>{props.order.product.name}</td>
            <td>{'$' + props.order.product.price}</td>
            <td>{props.order.quantity}</td>
            <td>{new Date(props.order.dateOrdered.replace(' ', 'T')).toDateString()}</td>
            <td>{props.order.status}</td>
        </tr>
    )
}