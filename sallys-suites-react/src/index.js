import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StepContext } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <Context.Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);
