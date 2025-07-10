import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Arrivals from './pages/Arrivals';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusInfo from "./pages/BusInfo";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Layout} from "./Layout";
import Home from "./pages/Home";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
export default function RouterPage() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="arrivals" index element={<Home/>}/>
                    <Route path="arrivals" index element={<Arrivals/>}/>
                    <Route path="info" element={<BusInfo/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
root.render(
  <React.StrictMode>
     <Layout>
      <RouterPage />
     </Layout>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
