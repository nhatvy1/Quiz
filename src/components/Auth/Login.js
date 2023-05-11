import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Login = (props)=> {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const handleShowPassword = ()=> {
        setShowPassword(!showPassword)
    }

    const handleLogin = async ()=> {
        // validate

        // submit apis
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate("/")
        }

        if (data && +data.EC !== 0) {
            toast.error(data.EM)
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
                        onClick={()=>handleLogin()}
                    >Log in to Typeform</button>
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