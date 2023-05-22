import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner10 } from 'react-icons/im';

const Login = (props)=> {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleShowPassword = ()=> {
        setShowPassword(!showPassword)
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleLogin = async ()=> {
        // validate
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error('Invalid email')
            return 
        }
        
        if (!password) {
            toast.error('Invalid password')
            return
        }

        setIsLoading(true)

        // submit apis
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM)
            setIsLoading(false)
            navigate("/")
        }

        if (data && +data.EC !== 0) {
            toast.error(data.EM)
            setIsLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="header">
            <span>Don't have an account yet?</span>
            <button onClick={()=>navigate('/signup')}>Sign up</button> Contact us
            </div>
            <div className="title col-4 mx-auto">
                Nhật Vỹ Huỳnh
            </div>
            <div className="welcome col-4 mx-auto">
                Hello, who’s this?
            </div>
            <div className="form-login col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <div className="password-cus">
                        <input className="form-control"
                            type={showPassword === true ? 'text': 'password'}
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)}
                        />
                        <span onClick={()=>handleShowPassword()}>
                            { showPassword === true ? <AiFillEye /> : <AiFillEyeInvisible /> }
                        </span>
                    </div>
                </div>
                <span>Forgot password ?</span>
                <div>
                    <button
                        className="btn-submit"
                        onClick={()=>handleLogin()}
                        disabled={isLoading}
                    >
                        {isLoading === true && <ImSpinner10 className="loader-icon"/>}
                         <span>Log in to Typeform</span>
                    </button>
                </div>
                <div className="back">
                    <span
                        onClick={()=>navigate('/')}
                    >&#60;&#60; Go to home page</span>
                </div>
            </div>
        </div>
    )
}

export default Login