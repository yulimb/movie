import React from 'react'
import {
	render
} from 'react-dom'
import {
	BrowserRouter
} from 'react-router-dom'
import App from './app'
const rootElement = document.getElementById('app')

render(
	<BrowserRouter>
    <App />
  </BrowserRouter>,
	rootElement
)

// import React from "react";
// import ReactDOM from "react-dom";

// const App = () => {
// 	return <h1>Hello World!</h1>;
// };

// ReactDOM.render(<App />, document.getElementById("app"));