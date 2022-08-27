import { useContext, useEffect } from "react"
import OrderItem from "../components/orderItem"
import { OrdersContext } from "../contexts"

export default function Orders() {
    const { orders } = useContext(OrdersContext)

    useEffect(() => {
        document.title = "Orders"
    }, [])

    return (
        <>
            <h1 className="text-center fw-bold mb-5">Orders</h1>
            <div className="table-responsive rounded">
                <table className="table table-light align-middle text-center">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Date ordered</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length
                            ? (orders.map((order) => <OrderItem key={order.id} order={order} />))
                            : <tr><td colSpan={6}>You have no orders.</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}