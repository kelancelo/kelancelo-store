import { useNavigate, useParams } from "react-router-dom"

export default function CategoryCard({ category }) {
    const navigate = useNavigate()

    return (
        <div
            className="category-card-container border border-secondary rounded"
            style={{
                backgroundColor: 'white',
                display: 'grid',
                alignContent: 'end',
                width: '18rem'
            }}
        >
            <div className="category-card card text-dark text-center" style={{ border: 'none' }}>
                <img src={category.picture} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{category.name.toUpperCase()}</h5>
                    <p className="card-text">
                        {category.description}
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/products/category/${category.id}`)}
                    >
                        Shop now
                    </button>
                </div>
            </div>
        </div>
    )
}