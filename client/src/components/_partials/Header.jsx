import { Link } from "react-router-dom";
import CreateProfile from "../modals/CreateProfile";
import Profiles from "../modals/Profiles";
import GetAllProfiles from "./GetAllProfiles";

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
                    <Profiles />
                </Link>
                <Link>
                    <CreateProfile />
                </Link>
                <GetAllProfiles />
            </ul>
            <hr />
        </div>
    );
}

export default Header;
