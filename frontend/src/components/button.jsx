export default function Button(props) {
    return (
        <button
            className="primary-button"
            onClick={props.onClick && props.onClick}
            style={{
                paddingBlock: props.paddingBlock ? props.paddingBlock : '0.5em',
                paddingInline: props.paddingInline ? props.paddingInline : '1.5em',
                backgroundColor: 'transparent',
                border: '1px solid white',
                color: 'white',
                fontSize: props.fontSize ? props.fontSize : '1rem',
                borderRadius: '1rem'
            }}
        >
            {props.children}
        </button>
    )
}