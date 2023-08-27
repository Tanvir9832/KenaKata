import "./Counter.css"

type Props = {
    decrement() : void ,
    increment(): void ,
    count : number
}

const Counter = (props : Props) => {
    return (
        <div className="counterPage">
            <button onClick={props.decrement} className="counter"><i className="fa-solid fa-minus"></i></button>
            <h5 className="text">{ props.count }</h5>
            <button onClick={props.increment} className="counter"><i className="fa-solid fa-plus"></i></button>
        </div>
    )
}

export default Counter