import { useRef, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressForm from "../components/addressForm";
import Cart from "../components/cart";
import { CartContext, FetchedAllInitialDataContext, LoggedInUserContext, OrdersContext } from "../contexts";
import CheckoutSuccess from "../components/checkoutSuccess";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


export default function Checkout() {
    const navigate = useNavigate()
    const { fetchedAllInitialData } = useContext(FetchedAllInitialDataContext)
    const { loggedInUser } = useContext(LoggedInUserContext)
    const { setOrders } = useContext(OrdersContext)
    const { cartItems, setCartItems } = useContext(CartContext)
    let cartItemsTotal = 0
    let shippingType
    let shippingFeeTotal = 0
    if (loggedInUser && loggedInUser.country && cartItems) {
        cartItemsTotal = cartItems.reduce((total, currentItem) => {
            return total + (currentItem.product.price * currentItem.quantity)
        }, 0)
        shippingType = loggedInUser.country.toLowerCase() === 'philippines'
            ? {
                id: 'local',
                cost: 5
            }
            : {
                id: 'international',
                cost: 25
            }
        shippingFeeTotal = cartItems.reduce((total, item) => total + item.quantity, 0) * shippingType.cost
    }
    const [orderComplete, setOrderComplete] = useState(false)


    useEffect(() => {
        document.title = 'Checkout'
    }, [])

    useEffect(() => {
        if (fetchedAllInitialData && (!loggedInUser || !cartItems.length) && !orderComplete) {
            navigate('/')
        }
    }, [fetchedAllInitialData, loggedInUser, cartItems, orderComplete])



    if (fetchedAllInitialData) {
        if (loggedInUser.country && !orderComplete) return (
            <PayPalScriptProvider options={{
                "client-id": "AdGKwjtw8Mds7p2S95DHa-hBJjJWvfRu33_kRxxUbNEnK6g1jVMb0oSctfH1fYo4r-ksaK0DuNA55tPt",
                currency: "USD",
                intent: "capture"
            }}
            >
                <div style={{ display: 'grid', rowGap: '2em' }}>
                    <h1 className="text-center fw-bold">Checkout</h1>
                    <Cart />
                    <div style={{ display: 'grid', rowGap: '.5em' }}>
                        <span className="fs-5 fw-bold">{`Subtotal: $${cartItemsTotal} USD`}</span>
                        <span className="fs-5 fw-bold">
                            {`Shipping: $${shippingFeeTotal} USD`}
                            <span style={{ display: 'inline-block', fontSize: '.75rem' }}>
                                {'(The items will ship from Philippines. Shipping fee for local customers is 5 USD per item while international shipping is 25 USD per item)'}
                            </span>
                        </span>
                        <span className="fs-4 fw-bold">{`Total: $${cartItemsTotal + shippingFeeTotal} USD`}</span>
                    </div>
                    <div style={{ display: 'grid', justifyContent: 'center' }}>
                        {cartItems.length &&
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    currency_code: 'USD',
                                                    value: (cartItemsTotal + shippingFeeTotal).toString(),
                                                    breakdown: {
                                                        item_total: {
                                                            currency_code: 'USD',
                                                            value: cartItemsTotal.toString()
                                                        },
                                                        shipping: {
                                                            currency_code: 'USD',
                                                            value: shippingFeeTotal.toString()
                                                        }
                                                    }
                                                },
                                                items: cartItems.map((item) => {
                                                    return {
                                                        name: item.product.name,
                                                        quantity: item.quantity,
                                                        unit_amount: { currency_code: 'USD', value: item.product.price.toString() }
                                                    }
                                                })
                                            }
                                        ]
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    async function captureOrderHandler(details) {
                                        const payerName = details.payer.name.given_name;
                                        for (const cartItem of cartItems) {
                                            let { customerId, productId, quantity } = cartItem
                                            const res = await fetch('/api/orders', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({ customerId, productId, quantity: parseInt(quantity), shippingTypeId: shippingType.id })
                                            })
                                            if (res.ok) {
                                                const data = await res.json()
                                                setOrders((o) => [data, ...o])
                                                setCartItems((ci) => ci.filter((item => item.productId !== cartItem.productId)))
                                                console.log('Transaction completed');
                                            }
                                            else { console.log(res) }
                                        }
                                        setOrderComplete(true)
                                    };

                                    return actions.order.capture().then(captureOrderHandler);
                                }}
                                // handle unrecoverable errors
                                onError={(err) => {
                                    console.error('An error prevented the buyer from checking out with PayPal', err);
                                }}
                            />
                        }
                    </div>
                </div>
            </PayPalScriptProvider>
        )
        else if (orderComplete) return (
            <CheckoutSuccess />
        )
        else if (!loggedInUser.country) return (
            <>
                <h2 className="fw-bold mb-5 text-center">Enter your address to proceed to checkout.</h2>
                <AddressForm />
            </>
        )
    }
}



