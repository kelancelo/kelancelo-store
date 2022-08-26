import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../components/imageSlider";
import { AlertContext, CartContext, LoggedInUserContext, ProductsContext } from "../contexts";

export default function ProductPage() {
    const params = useParams()
    const { products } = useContext(ProductsContext)
    const product = products.find((product) => product.id === parseInt(params.productId))
    const { loginWithRedirect } = useAuth0()
    const { loggedInUser } = useContext(LoggedInUserContext)
    const { setCartItems } = useContext(CartContext)
    const { setAlert } = useContext(AlertContext)
    const inputRef = useRef(null)


    async function addItemToCart(e) {
        e.preventDefault()
        const res = await fetch(`/api/cartItems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customerId: loggedInUser.id,
                productId: product.id,
                quantity: parseInt(inputRef.current.value)
            })
        })
        if (res.ok) {
            const data = await res.json()
            setCartItems(ci => [...ci, data])
            setAlert({ open: true, message: 'Item added to cart.', severity: 'success' })
        }
        else if (res.status === 409) { setAlert({ open: true, message: 'Item added to cart already.', severity: 'error' }) }
    }

    if (product) return (
        <div id="product-page">
            <div>
                <ImageSlider pictures={product.pictures} />
            </div>
            <div className="product-details text-center">
                <h1 className="fw-bold">{product.name}</h1>
                <span>{'$' + product.price}</span>
                <form onSubmit={(e) => addItemToCart(e)}>
                    <label htmlFor="quantity">Quantity</label>
                    <input className="form-control text-center" type="number" ref={inputRef} defaultValue={1} min={1} id="quantity" required />
                    <button
                        onClick={loggedInUser ? null : () => loginWithRedirect({ prompt: 'select_account' })}
                        className="btn btn-light"
                    >
                        Add to cart
                    </button>
                </form>
                <p>{product.description}</p>
            </div>
        </div>
    )
}