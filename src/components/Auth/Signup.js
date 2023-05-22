import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postSignup } from '../../services/apiService';
import { toast } from 'react-toastify';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import _ from 'lodash';

const Signup = (props)=> {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [username, setUsername] = useState()
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleShowPassword = ()=> {
        setShowPassword(!showPassword)
    }

    const handleSignup = async ()=> {
        // validate
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error('Invalid email')
            return 
        }
        
        if (!password && !confirmPassword) {
            toast.error('Invalid password or confirm password')
            return
        }

        if (!_.isEqual(password, confirmPassword)) {
            toast.error('Password  confirm password not match')
            return
        }
        
        // submit apis
        let data = await postSignup(email, password, username)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate("/login")
        }

        if (data && +data.EC !== 0) {
            toast.error(data.EM)
        }
    }


    return (
        <div className="login-container">
            <div className="header">
            <span>Already have a account?</span>
            <button onClick={()=>navigate('/login')}>Login</button>
            </div>
            <div className="title col-4 mx-auto">
                Nhật Vỹ Huỳnh
            </div>
            <div className="welcome col-4 mx-auto">
                Sign Up ?
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
                <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="password-cus">
                        <input className="form-control"
                            type={showPassword === true ? 'text': 'password'}
                            value={confirmPassword}
                            onChange={(event)=>setConfirmPassword(event.target.value)}
                        />
                        <span onClick={()=>handleShowPassword()}>
                            { showPassword === true ? <AiFillEye /> : <AiFillEyeInvisible /> }
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control"
                        value={username}
                        onChange={(event)=>setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <button
                        onClick={()=>handleSignup()}
                    >Sign Up to Typeform</button>
                </div>
                <div className="back">
                    <span
                        onClick={()=>navigate('/login')}
                    >&#60;&#60; Go to log in</span>
                </div>
            </div>
        </div>
    )
}

export default Signup