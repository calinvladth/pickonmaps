import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {store} from "./slices/store";
import {Provider} from "react-redux";
import './main.css'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
