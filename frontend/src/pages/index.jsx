import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CategoryCard from "../components/categoryCard"

export default function Index() {
    const [categories, setCategories] = useState([])
    const isFirstMount = useRef(true)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Kelancelo store'
    }, [])

    useEffect(() => {
        async function fetchCategories() {
            const res = await fetch('/api/categories')
            if (res.ok) {
                const data = await res.json()
                setCategories(data)
            }
            else { console.log('fetch categories error') }
        }
        if (isFirstMount.current) { fetchCategories() }
        return () => isFirstMount.current = false
    }, [])

    return (
        <>
            <header
                className="mb-5"
                style={{
                }}
            >
                <div
                    className="rounded"
                    style={{ backgroundColor: 'white', display: 'grid', placeItems: 'center', height: '100%' }}
                >
                    <div id="featured-product" className="card text-dark text-center border-light" style={{}}>
                        <img
                            src="/images/products/guitars/black.jpg"
                            className="card-img-top"
                            alt="..."
                            style={{}}
                        />
                        <div
                            className="card-body"
                            style={{

                            }}
                        >
                            <h1 className="card-title fw-bold">Featured product</h1>
                            <h3 className="card-text">
                                Synyster Gates Limited Edition Dark Night Guitar
                            </h3>
                            <button className="btn btn-primary" onClick={() => navigate('/products/1')}>
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <section id="category-cards">
                <h2 className="fw-bold text-center mb-5">CATEGORIES</h2>
                <div id="category-cards-container" style={{ display: 'grid', rowGap: '2em', justifyContent: 'center' }}>
                    {categories && categories.map(category => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </section>
        </>
    )
}