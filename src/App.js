import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponent from './components/MyComponent';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<div className="App">
			Hello world
			<MyComponent />
		</div>
	)
}

export default App;
