import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import {ContextProvider} from './Context';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./Redux/Store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		{/*<ContextProvider>*/}
		{/*<ThemeProvider theme={theme}>*/}
		<Provider store={store}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</Provider>
		{/*</ThemeProvider>*/}
		{/*</ContextProvider>*/}
	</React.StrictMode>
);