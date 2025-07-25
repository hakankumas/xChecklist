import { Link } from "react-router-dom";
import CreateProfile from "../modals/CreateProfile";
import CreateQuestion from "../modals/CreateQuestion";

function Header() {
    return (
        <div className="my-3">
            <ul
                className="d-flex justify-content-between"
                style={{ display: "flex", gap: "30px", fontSize: "30px" }}
            >
                <div>
                    <Link
                        className="me-3"
                        style={{ textDecoration: "none", color: "black" }}
                        to="/"
                    >
                        CheckList
                    </Link>
                    <Link>
                        <CreateProfile />
                    </Link>
                </div>
                <div>
                    <Link>
                        <CreateQuestion />
                    </Link>
                </div>
            </ul>
            <hr className="pb-2" />
        </div>
    );
}

export default Header;
