import './button.css';
function MyButton(props) {

    return (
        <button className='button' onClick={() => props.func(props.name)}>
            {props.name}
        </button>
    )
}

export default MyButton;