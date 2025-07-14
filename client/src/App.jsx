import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/_partials/Header";
import Home from "./pages/Home";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
