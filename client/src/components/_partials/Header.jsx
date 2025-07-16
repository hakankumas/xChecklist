import { Link } from "react-router-dom";
import CreateProfile from "../modals/CreateProfile";
import Profiles from "../modals/Profiles";
import { useState } from "react";

function Header() {
    const [isNewProfile, setCreateNewProfile] = useState(false);
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
                    <Profiles
                        isNewProfile={isNewProfile}
                        setCreateNewProfile={setCreateNewProfile}
                    />
                </Link>
                <Link>
                    <CreateProfile setCreateNewProfile={setCreateNewProfile} />
                </Link>
            </ul>
        </div>
    );
}

export default Header;
