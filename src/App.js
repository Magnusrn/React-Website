import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Timer from "./pages/Timer";
import NoPage from "./pages/NoPage";
import Contact from "./pages/Contact";
import NavigationBar from "./components/navbar/NavigationBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/footer/Footer";
import Stopwatch from "./pages/Stopwatch";
import styles from "./App.module.css"
import Terminal from './components/terminal/Terminal';

export default function App() {
    return (
        <div>
        <style>{"body { background-color: grey; }"}</style>
        <BrowserRouter>
            <NavigationBar/>
            <div className={styles.body}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                {/*allow aliases to access the timer page for speed*/}
                {["timer", "t"].map(path => (
                    <Route key={path} path={path} element={<Timer/>}>
                        <Route path=":args" element={<Timer/>}/>
                    </Route>))}
                <Route path="stopwatch" element={<Stopwatch/>}/>
                <Route path="contact" element={<Contact/>}/>
                <Route path="terminal" element={<Terminal/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
            </div>
            <Footer/>
        </BrowserRouter>
        </div>
    );
}
//todo
//add ci to github