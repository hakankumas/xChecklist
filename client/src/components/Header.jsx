import { Link } from "react-router-dom";

function Header() {
    return (
        <div>
            <ul
                style={{
                    display: "flex",
                    gap: "50px",
                    fontSize: "30px",
                }}
            >
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                    Home
                </Link>
                <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admins"
                >
                    Admins
                </Link>
                <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/users"
                >
                    Users
                </Link>
            </ul>
        </div>
    );
}

export default Header;
