import { Link } from "react-router-dom";
import CreateProfile from "../modals/CreateProfile";

function Header() {
    return (
        <div className="my-3">
            <ul
                style={{
                    display: "flex",
                    gap: "30px",
                    fontSize: "30px",
                }}
            >
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                    CheckList
                </Link>
                <Link>
                    <CreateProfile />
                </Link>
            </ul>
            <hr />
        </div>
    );
}

export default Header;
