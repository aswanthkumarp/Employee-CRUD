import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { ThemeProvider } from '@material-tailwind/react';
import { Toast } from './components/Toast.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
     <Toast/>
    </ThemeProvider>
  </React.StrictMode>
);
