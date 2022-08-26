import { useEffect, useRef } from "react"

export default function CartItem(props) {
    const quantityRef = useRef(null)

    return (
        <div
            className="cart-item"
            style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(4rem, 1fr) minmax(5rem, 1fr) minmax(2.5rem, 1fr) minmax(4rem, 1fr)',
                // gridTemplateColumns: 'repeat(4, 1fr)',
                columnGap: '5%',
                alignItems: 'center',
                justifyItems: 'center',
            }}
        >
            <div>
                <img
                    src={props.item.product.pictures[0]}
                    alt=""
                    style={{ borderRadius: '4px', width: '100%' }}
                />
            </div>
            <span
                className="cart-item-name"
                title={props.item.product.name}
                style={{ overflowX: 'hidden' }}
            // style={{ width: '5rem', maxWidth: '10rem' }}
            >
                {props.item.product.name}
            </span>
            <span className="cart-item-price">{'$' + props.item.product.price}</span>
            <div
                className="quantity-group"
                style={{
                    display: 'grid',
                    rowGap: '.5em'
                }}
            >
                <form
                    onSubmit={(e) => props.updateItem(e, props.item.customerId, props.item.productId, quantityRef.current.value)}
                >
                    <input
                        className="form-control-sm text-center border border-dark"
                        type="number"
                        defaultValue={props.item.quantity}
                        ref={quantityRef}
                        onBlur={(e) => {
                            props.updateItem(e, props.item.customerId, props.item.productId, quantityRef.current.value)
                        }}
                        style={{ width: '100%' }}
                    />
                </form>
                <button
                    className={"btn btn-sm" + (props.removeButtonBGColor ? ' btn-primary' : ' btn-light')}
                    onClick={props.removeItem}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}