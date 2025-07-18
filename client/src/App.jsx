import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/_partials/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./scss/index.scss";

function App() {
    return (
        <div className="mx-5">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile/:id" element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;
