import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Timer from "./pages/Timer";
import NoPage from "./pages/NoPage";
import Contact from "./pages/Contact";
import NavigationBar from "./components/navbar/NavigationBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/footer/Footer";

export default function App() {
    return (
        <BrowserRouter>
            <NavigationBar/>
            <Routes>
                <Route index element={<Home/>}/>
                {/*allow aliases to access the timer page for speed*/}
                {["timer", "t"].map(path => (
                    <Route key={path} path={path} element={<Timer/>}>
                        <Route path=":args" element={<Timer/>}/>
                    </Route>))}
                <Route path="contact" element={<Contact/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}