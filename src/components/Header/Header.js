import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import _ from 'lodash';


const Header = () => {
    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const navigate = useNavigate()
    const handleLogin = ()=> {
        navigate(('/login'))
    }
    const handleSignup = ()=> {
        navigate('/signup')
    }

    console.log('Check username: ', _.isEmpty(account.username))

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink to="/" className="navbar-brand">Nhật Vỹ Huỳnh</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/users" className="nav-link">Users</NavLink>
                        <NavLink to="/admin" className="nav-link">Admin</NavLink>
                    </Nav>
                    <Nav>
                        {
                            isAuthenticated === false ? 
                            <>
                                <button className="btn-login" onClick={()=>handleLogin()}>Log in</button>
                                <button className="btn-signup" onClick={()=>handleSignup()}>Sign up</button>
                            </>
                            :
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item>Log out</NavDropdown.Item>  
                                <NavDropdown.Item>
                                    {
                                        _.isEmpty(account.username) === true ? 'Profiles' : account.username
                                    }
                                </NavDropdown.Item>   
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
