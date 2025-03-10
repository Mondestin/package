import React, { Suspense } from "react";
import "./assets/scss/style.scss";
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import { UserProvider } from './components/contexts/UserContext'; // Import UserProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<Loader />}>
    <HashRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </HashRouter>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
