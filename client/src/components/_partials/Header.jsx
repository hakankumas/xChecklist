import { Link } from "react-router-dom";
import CreateProfile from "../modals/CreateProfile";
import Profiles from "../modals/Profiles";

function Header() {
    return (
        <div>
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
                    <Profiles />
                </Link>
                <Link>
                    <CreateProfile />
                </Link>
            </ul>
        </div>
    );
}

export default Header;
