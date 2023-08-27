// import {useContext} from 'react';
import Products from '../../components/Products/Products'
import "./HomePage.css"
// import { Store } from '../../Store';



const Home = () => {
    // const {state : {cart} , dispatch} = useContext(Store);
    return (
        <div>
            <main>
                <Products />
            </main>
        </div>
    )
}

export default Home