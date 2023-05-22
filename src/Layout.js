import { Route, Routes } from 'react-router-dom';
import App from './App';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import HomePage from './components/Home/Homepage';
import ManageUser from './components/Admin/Content/ManageUser';
import Dasboard from './components/Admin/Content/Dasboard';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Auth/Signup';
import ListQuiz from './components/User/ListQuiz';

const Layout = (porps)=> {
    return (
        <>
			<Routes>
				<Route path="/" element={<App />} >
					<Route index element={<HomePage />} />
					<Route path="users" element={<ListQuiz />} />
				</Route>

				<Route path="admin" element={<Admin />} >
					<Route index element={<Dasboard />} />
					<Route path="dashboard" element={<Dasboard />} />
					<Route path="manage-users" element={<ManageUser />} />
				</Route>

				<Route path="/login" element={<Login />}/>
				<Route path="/signup" element={<Signup />}/>
			</Routes>

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<ToastContainer />
        </>
    )
}

export default Layout