import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfile } from "../../redux/features/profile/profileSlice";

function GetAllProfiles() {
    console.log("GetAllProfiles is worked.");
    const { profiles } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProfile());
    }, [dispatch]);
    return (
        <div className="ms-3">
            <div className="dropdown">
                <button
                    className="btn btn-lg btn-danger dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <FaUser size={25} />
                    <span className="ms-2">Profil Seç</span>
                </button>
                <ul className="dropdown-menu">
                    {profiles.map((profile) => (
                        <Link
                            key={profile.id}
                            className="dropdown-item"
                            to={`/profile/${profile.id}`}
                        >
                            {profile.domain_name}
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GetAllProfiles;
