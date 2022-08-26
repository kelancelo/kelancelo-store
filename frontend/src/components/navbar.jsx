import { useNavigate } from "react-router-dom"
import { useState, useRef, useContext } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import Cart from "./cart"
import { CartContext, LoggedInUserContext } from "../contexts"
import AddressForm from "./addressForm"
import SearchBar from "./searchbar"

export default function Navbar() {
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showNavLinks, setShowNavLinks] = useState(false)
    const navigate = useNavigate()
    const navLinksRef = useRef(null)
    const { loggedInUser } = useContext(LoggedInUserContext)
    const { loginWithRedirect, logout } = useAuth0()
    const { cartItems } = useContext(CartContext)
    let cartItemsTotal = 0
    if (cartItems.length) {
        cartItemsTotal = cartItems.reduce((total, currentItem) => {
            return total + (currentItem.product.price * currentItem.quantity)
        }, 0)
    }


    return (
        <>
            <nav>
                <div
                    id="logo"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        src="/images/kelancelo-store-logo.png"
                        alt="kelancelo store"
                        style={{ width: '2rem' }}
                    />
                </div>
                <SearchBar />
                <div
                    id="menu-buttons"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'max-content max-content',
                        columnGap: '1em',
                        placeItems: 'center',
                        justifySelf: 'end'
                    }}
                >
                    <button
                        id="user-menu-toggler"
                        className="btn btn-secondary"
                        style={{
                            width: '2rem',
                            height: '2rem',
                            cursor: 'pointer',
                            display: 'grid',
                            placeContent: 'center',
                            borderRadius: '50%',
                            backgroundColor: 'transparent'
                        }}
                        onClick={() => {
                            setShowUserMenu(!showUserMenu)
                            setShowNavLinks(false)
                        }}
                    >
                        <img
                            src={loggedInUser ? loggedInUser.picture : "/images/user.svg"}
                            alt="user profile picture"
                            style={{ width: '2rem', borderRadius: '50%' }}
                            title="User menu" />
                    </button>
                    <button
                        className="btn btn-secondary"
                        id="nav-links-toggler"
                        onClick={() => {
                            setShowNavLinks(!showNavLinks)
                            setShowUserMenu(false)
                        }}
                    >
                        <img src={showNavLinks ? "/images/cross.svg" : "/images/menu.svg"} alt="menu icon" />
                    </button>
                </div>


                <ul
                    id="user-menu"
                    className="list-group nav-menu text-center"
                    style={{
                        transform: showUserMenu ? 'translateX(0%)' : 'translateX(100%)'
                    }}

                >
                    {loggedInUser ?
                        <>
                            <li
                                className="list-group-item bg-dark text-light"
                                onClick={() => {
                                    setShowUserMenu(false)
                                    navigate('/orders')
                                }}
                            >
                                Orders
                            </li>
                            <li
                                className="list-group-item bg-dark text-light"
                                data-bs-toggle="modal"
                                data-bs-target="#cartModal"
                                onClick={() => setShowUserMenu(false)}
                            >
                                Cart
                            </li>
                            <li
                                className="list-group-item bg-dark text-light"
                                data-bs-toggle="modal"
                                data-bs-target="#updateAddressModal"
                                onClick={() => setShowUserMenu(false)}
                            >
                                Update address
                            </li>
                            <li
                                className="list-group-item bg-dark text-light"
                                onClick={() => logout({ returnTo: window.location.origin })}
                            >
                                Log out
                            </li>
                        </>
                        :
                        <li
                            className="list-group-item bg-dark text-light"
                            onClick={() => loginWithRedirect({ prompt: 'select_account' })}
                        >
                            Log in
                        </li>
                    }
                </ul>
                <ul
                    id="nav-links"
                    className="list-group text-center nav-menu"
                    style={{ transform: showNavLinks ? 'translateX(0%)' : 'translateX(100%)' }}
                    ref={navLinksRef}
                >
                    <li
                        className="list-group-item bg-dark"
                        onClick={() => {
                            navigate('/products/category/guitars')
                            setShowNavLinks(false)
                        }}
                    >
                        <span>Guitars</span>
                    </li>
                    <li
                        className="list-group-item bg-dark"
                        onClick={() => {
                            navigate('/products/category/clothing')
                            setShowNavLinks(false)
                        }}
                    >
                        <span>Clothing</span>
                    </li>
                    <li
                        className="list-group-item bg-dark"
                        onClick={() => {
                            navigate('/products/category/accessories')
                            setShowNavLinks(false)
                        }}
                    >
                        <span>Accessories</span>
                    </li>
                </ul>
            </nav >


            <div
                className="modal fade"
                id="cartModal"
                tabIndex={-1}
                aria-labelledby="cartModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content bg-light text-dark">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cartModalLabel">
                                Cart
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <Cart removeButtonBGColor='dark' />
                        </div>
                        {cartItems.length
                            ? (
                                <div className="modal-footer">
                                    <span className="cart-total-price fw-bold">{`Subtotal: $${cartItemsTotal} USD`}</span>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => navigate('/checkout')}
                                        data-bs-dismiss="modal"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            )
                            : null
                        }
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="updateAddressModal"
                tabIndex={-1}
                aria-labelledby="updateAddressLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable text-dark">
                    <div className="modal-content bg-light">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateAddressLabel">
                                Update Address
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <AddressForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}