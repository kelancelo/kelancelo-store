import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { AlertContext, LoggedInUserContext } from "../contexts"

export default function AddressForm() {
    const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext)
    const { setAlert } = useContext(AlertContext)
    const initialAddressState = {
        houseAddress: '',
        city: '',
        stateOrProvince: '',
        postalCode: '',
        country: ''
    }
    const [address, setAddress] = useState(initialAddressState)

    useEffect(() => {
        if (loggedInUser) {
            setAddress({
                houseAddress: loggedInUser.houseAddress ? loggedInUser.houseAddress : '',
                city: loggedInUser.city ? loggedInUser.city : '',
                stateOrProvince: loggedInUser.stateOrProvince ? loggedInUser.stateOrProvince : '',
                postalCode: loggedInUser.postalCode ? loggedInUser.postalCode : '',
                country: loggedInUser.country ? loggedInUser.country : ''
            })
        }
    }, [loggedInUser])

    function handleChange(e) {
        setAddress({ ...address, [e.target.id]: e.target.value })
    }

    async function updateAddress(e) {
        e.preventDefault()
        const res = await fetch(`/api/customers/${loggedInUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(address)
        })
        if (res.ok) {
            const data = await res.json()
            setAddress(initialAddressState)
            setLoggedInUser(data)
            setAlert({ open: true, message: 'Address updated successfully.', severity: 'success' })
        }
    }

    return (
        <form onSubmit={updateAddress}>
            <div className="mb-3">
                <label htmlFor="houseAddress" className="form-label">
                    Apartment, unit, suite, or floor #
                </label>
                <input
                    type="text"
                    className="form-control border border-dark"
                    id="houseAddress"
                    value={address.houseAddress}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">
                    City
                </label>
                <input
                    type="text"
                    className="form-control border border-dark"
                    id="city"
                    value={address.city}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="stateOrProvince" className="form-label">
                    State/Province
                </label>
                <input
                    type="text"
                    className="form-control border border-dark"
                    id="stateOrProvince"
                    value={address.stateOrProvince}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">
                    Postal code
                </label>
                <input
                    type="text"
                    className="form-control border border-dark"
                    id="postalCode"
                    value={address.postalCode}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="country" className="form-label">
                    Country
                </label>
                <input
                    type="text"
                    className="form-control border border-dark"
                    id="country"
                    value={address.country}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-dark">
                Save
            </button>
        </form>
    )
}
