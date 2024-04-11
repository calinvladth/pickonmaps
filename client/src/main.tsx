import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {persistor, store} from "./slices/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {ThemeProvider} from "styled-components";
import theme from "./utils/theme";
import GlobalStyle from "./global-style";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<p>Loading ...</p>} persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <App/>
                        <GlobalStyle/>
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
