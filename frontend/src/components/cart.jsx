import { CartContext, AlertContext } from "../contexts"
import { useContext } from "react"
import CartItem from "./cartItem"

export default function Cart(props) {
    const { cartItems, setCartItems } = useContext(CartContext)
    const { setAlert } = useContext(AlertContext)


    async function removeItem(customerId, productId) {
        const res = await fetch(`/api/cartItems/${customerId}/${productId}`, {
            method: 'DELETE'
        })
        if (res.ok) {
            setCartItems(ci => ci.filter(item => !(item.customerId === customerId && item.productId === productId)))
        }
        else console.log('delete cart item error.')
    }

    async function updateItem(e, customerId, productId, quantity) {
        e.preventDefault()
        const res = await fetch(`/api/cartItems/${customerId}/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: parseInt(quantity) })
        })
        if (res.ok) {
            const data = await res.json()
            setCartItems(ci => ci.map(item => {
                if (item.customerId === customerId && item.productId === productId) {
                    return { ...item, quantity: data.quantity }
                }
                else return item
            }))
            setAlert({ open: true, message: 'Item updated successfully.', severity: 'success' })
        }
    }

    return (
        <div
            id="cart"
            style={{
                display: 'grid',
                rowGap: '1em'
            }}
        >
            {cartItems.length
                ? cartItems.map(item => (
                    <CartItem
                        key={item.customerId + item.productId}
                        item={item}
                        removeItem={() => removeItem(item.customerId, item.productId)}
                        updateItem={updateItem}
                        removeButtonBGColor={props.removeButtonBGColor ? props.removeButtonBGColor : null}
                    />
                ))
                : <span>Cart is empty.</span>
            }
        </div>
    )
}