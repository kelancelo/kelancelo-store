import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import Product from "../components/product"
import { ProductsContext } from "../contexts"

export default function ProductsByCategory() {
    const params = useParams()
    const { products } = useContext(ProductsContext)
    const productsToShow = products.filter((product) => product.categoryId === params.categoryId)

    useEffect(() => {
        document.title = params.categoryId[0].toUpperCase() + params.categoryId.slice(1)
    }, [params.categoryId])

    return (
        <main id="products">
            <h1 className="fw-bold mb-5">{params.categoryId.toLocaleUpperCase()}</h1>
            <div className="products-container">
                {productsToShow.map(product => <Product key={product.id} product={product} />)}
            </div>
        </main>
    )
}