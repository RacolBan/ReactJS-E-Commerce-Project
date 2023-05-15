import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './grid.css';
import "react-toastify/ReactToastify.min.css";
import { DataProvider } from 'GlobalState';
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DataProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </DataProvider>
);


