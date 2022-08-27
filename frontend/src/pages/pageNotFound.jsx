import { useEffect } from "react"

export default function PageNotFound() {
    useEffect(() => {
        document.title = 'Page not found'
    }, [])

    return (
        <div style={{ height: '80vh', display: 'grid', placeContent: 'center' }}>
            <h1 className='text-center'>Page not found.</h1>
        </div>
    )
}