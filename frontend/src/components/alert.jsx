import { useContext } from "react"
import { AlertContext } from "../contexts"

export default function Alert() {
    const { alert, setAlert } = useContext(AlertContext)
    let backgroundColor
    if (alert.severity === 'success') { backgroundColor = 'green' }
    else if (alert.severity === 'error') { backgroundColor = 'coral' }
    else { backgroundColor = 'gray' }

    return (
        <div
            id="alert"
            style={{
                position: 'fixed',
                minWidth: '10rem',
                top: '4rem',
                right: '0',
                padding: '.75em',
                paddingRight: '1.75em',
                backgroundColor,
                borderRadius: '4px',
                zIndex: '999999999999999',
                transform: alert.open ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 100ms ease-out'
            }}
        >
            <span>{alert.message}</span>
            <img
                src="/images/cross.svg"
                alt=""
                style={{
                    position: 'absolute',
                    top: '.3rem',
                    right: '.2rem',
                    height: '1.2rem',
                    width: '1.2rem',
                    cursor: 'pointer'
                }}
                onClick={() => setAlert(a => { return { ...a, open: false } })}
            />
        </div>
    )
}