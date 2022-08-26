import { useState } from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ProductsContext } from "../contexts"

export default function SearchBar() {
    const { products } = useContext(ProductsContext)
    const [searchInput, setSearchInput] = useState('')
    let searchResult = products.filter((product) => {
        return product.name.toLowerCase().includes(searchInput) && searchInput !== ''
    })
    const navigate = useNavigate()

    function handleChange(e) {
        setSearchInput(e.target.value.toLowerCase())
    }

    function clearSearchResult() {
        setSearchInput('')
    }

    return (
        <div id="searchbar" style={{ position: 'relative' }}>
            <input
                type="text"
                className="form-control-sm"
                placeholder="search the shop..."
                value={searchInput}
                onChange={handleChange}
            // onBlur={() => setSearchResult([])}
            />
            <ul
                className="list-group"
                id="search-result"
                style={{
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    backgroundColor: 'white'
                }}
            >
                {searchResult.map((product) => (
                    <li
                        key={product.id}
                        className="list-group-item"
                        title={product.name}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'max-content 1fr',
                            columnGap: '.5em',
                            alignItems: 'center'
                        }}
                        onClick={() => {
                            navigate(`/products/${product.id}`)
                            clearSearchResult()
                        }}
                    >
                        <img src={product.pictures[0]} alt="" style={{ width: '2rem' }} />
                        <span
                            style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}>
                            {product.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}