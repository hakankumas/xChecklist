import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Admins from "./pages/Admins";
import Users from "./pages/Users";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admins" element={<Admins />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </div>
    );
}

export default App;
