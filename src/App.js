import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Timer from "./pages/Timer";
import NoPage from "./pages/NoPage";
import Contact from "./pages/Contact";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    {/*allow aliases to access the timer page for speed*/}
                    {["timer","t"].map(path => (
                        <Route key={path} path={path} element={<Timer/>}>
                                <Route path=":args" element={<Timer/>}/>
                        </Route>))}
                    <Route path="contact" element={<Contact/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}