import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import "./LoginRegister.css"


const LoginRegister = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(loginEmail, loginPassword);
        console.log(registerTab);
        console.log(switcherTab);
    }

    const loginTab = useRef<HTMLFormElement | null>(null);
    const registerTab = useRef<HTMLFormElement | null>(null);
    const switcherTab = useRef<HTMLButtonElement | null>(null);

    const switchTabs = (e: React.MouseEventHandler<HTMLParagraphElement>, page: String) => {
        //console.log(page);
        if (page === "login") {

            switcherTab.current.classList.add("shiftNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (page === "register") {
            switcherTab.current.classList.remove("shiftNeutral");
            switcherTab.current.classList.add("shiftToRight");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }
    return (
        <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
                <div>
                    <div className='LoginSignUpToggle'>
                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                        <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>

                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className='loginEmail'>
                    <i className="fa-regular fa-envelope"></i>
                        <input type='email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder='Enter your email' />
                    </div>
                    <div className='loginPassword'>
                        <i className="fa-solid fa-unlock-keyhole"></i>
                        <input type='password' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder='Enter your password' />
                    </div>
                    <Link to="/password/forget">Froget Password ?</Link>
                    <input type="submit" value="Login" className='loginBtn' />
                </form>

            </div>
        </div>
    )
}

export default LoginRegister