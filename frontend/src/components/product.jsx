import { Link } from "react-router-dom"

export default function Product({ product }) {
    return (
        <Link
            className="product-card-container border border-secondary rounded"
            to={`/products/${product.id}`}
            style={{
                backgroundColor: 'white',
                display: 'grid',
                alignContent: 'end'
            }}
        >
            <div className="product-card card border-0">
                <img src={product.pictures[0]} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                        {'$' + product.price}
                    </p>

                </div>
            </div>
        </Link>
    )
}