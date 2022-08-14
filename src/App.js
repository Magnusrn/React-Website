import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Timer from "./pages/Timer";
import NoPage from "./pages/NoPage";
import Contact from "./pages/Contact";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="timer" element={<Timer />} >
                        <Route path=":minutes" element={<Timer />} >
                            <Route path=":seconds" element={<Timer />} />
                        </Route>
                    </Route>
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}