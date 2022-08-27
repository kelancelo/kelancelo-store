import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/navbar'
import Index from './pages'
import ProductsByCategory from './pages/productsByCategory'
import ProductPage from './pages/productPage'
import Checkout from './pages/checkout'
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from 'react'
import { LoggedInUserContext, AlertContext, CartContext, OrdersContext, FetchedAllInitialDataContext, ProductsContext } from './contexts'
import Alert from './components/alert'
import Orders from './pages/orders'
import PageNotFound from './pages/pageNotFound'


// function RequireAuth({ children }) {
//   const { isLoading, isAuthenticated } = useAuth0();
//   const location = useLocation();

//   if (!isLoading && !isAuthenticated) {
//     // Redirect them to the /login page, but save the current location they were
//     // trying to go to when they were redirected. This allows us to send them
//     // along to that page after they login, which is a nicer user experience
//     // than dropping them off on the home page.
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// }


export default function App() {
  const { isLoading, isAuthenticated, user } = useAuth0()
  const [loggedInUser, setLoggedInUser] = useState()
  const [fetchedAllInitialData, setFetchedAllInitialData] = useState(false)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' })

  
  useEffect(() => {
    async function saveUsertoDB() {
      const customerData = user.given_name
        ? {
          id: user.sub,
          email: user.email,
          givenName: user.given_name,
          familyName: user.family_name,
          picture: user.picture
        }
        : {
          id: user.sub,
          email: user.email,
          givenName: user.name,
          familyName: null,
          picture: user.picture
        }
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      })
      if (res.ok) {
        const data = await res.json()
        setLoggedInUser(data)
      }
    }
    if (!isLoading && isAuthenticated) {
      saveUsertoDB()
    }
  }, [isLoading, isAuthenticated])

  useEffect(() => {
    if (loggedInUser) {
      async function fetchOrders() {
        const res = await fetch(`/api/orders/${loggedInUser.id}`)
        if (res.ok) {
          const data = await res.json()
          setOrders(data)
        }
        // else if (res.status === 404) { console.log('no orders.') }
      }

      async function fetchCartItems() {
        const res = await fetch(`/api/cartItems/${loggedInUser.id}`)
        if (res.ok) {
          const data = await res.json()
          setCartItems(data)
        }
        // else if (res.status === 404) { console.log('no items in cart.') }
      }

      async function fetchAllInitialData() {
        await fetchOrders()
        await fetchCartItems()
        setFetchedAllInitialData(true)
      }

      fetchAllInitialData()
    }
  }, [loggedInUser])

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    }

    fetchProducts()
  }, [])


  return (
    <FetchedAllInitialDataContext.Provider value={{ fetchedAllInitialData, setFetchedAllInitialData }}>
      <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <ProductsContext.Provider value={{ products, setProducts }}>
          <OrdersContext.Provider value={{ orders, setOrders }}>
            <CartContext.Provider value={{ cartItems, setCartItems }}>
              <AlertContext.Provider value={{ alert, setAlert }}>
                <Navbar />
                <Alert />
                <Routes>
                  <Route path='/' element={<Index />} />
                  <Route path='/products/category/:categoryId' element={<ProductsByCategory />} />
                  <Route path='/products/:productId' element={<ProductPage />} />
                  <Route path='/orders' element={<Orders />} />
                  <Route path='/checkout' element={<Checkout />} />
                  <Route path='*' element={<PageNotFound />} />
                </Routes>
              </AlertContext.Provider>
            </CartContext.Provider>
          </OrdersContext.Provider>
        </ProductsContext.Provider>
      </LoggedInUserContext.Provider>
    </FetchedAllInitialDataContext.Provider>
  )
}
