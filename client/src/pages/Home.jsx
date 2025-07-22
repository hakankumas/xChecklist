import { useEffect, useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import SelectRank from "../components/SelectRank";
import { useCustomSnackBar } from "../hooks/useCustomSnackBar";
import axios from "axios";
import { useSelector } from "react-redux";
function Home() {
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    console.log("Home worked.");
    const [newData, setNewData] = useState({
        id: "",
        domain_name: "",
        google_account: "",
        email: "",
    });
    const [profiles, setProfiles] = useState([]);
    const handleData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/profile/getall`
            );
            setProfiles(response.data.profile);
        } catch (error) {
            console.error(`Sistem Mesajı!: ${error}`);
        }
    };
    const handleUpdate = async () => {
        const result = window.confirm(
            `Bu profili güncellemek istiyor musunuz?`
        );
        if (result) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/profile/update`,
                    newData
                );
                snackBar_success();
                handleData();
            } catch (error) {
                console.error(`Sistem Mesajı!: ${error}`);
                snackBar_error();
            }
        }
        setNewData({
            id: "",
            domain_name: "",
            google_account: "",
            email: "",
        });
    };
    const handleDelete = async (id) => {
        const result = window.confirm(`Bu profili silmek istiyor musunuz?`);
        if (result) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/profile/delete/${id}`
                );
                snackBar_success();
                handleData();
            } catch (error) {
                console.error(`Sistem Mesajı!: ${error}`);
                snackBar_error();
            }
        }
    };

    useEffect(() => {
        handleData();
    }, []);

    const { new_profiles } = useSelector((state) => state.profile);

    useEffect(() => {
        handleData();
    }, [new_profiles]);

    return (
        <div className="row">
            <div className="col-6 pe-4">
                <table className="table table-striped___ table-hover">
                    <thead style={{ border: "1px solid black" }}>
                        <tr>
                            <th style={{ width: "30%" }}>Domain Adresi</th>
                            <th style={{ width: "30%" }}>Google Hesabı</th>
                            <th style={{ width: "30%" }}>Email</th>
                            <th
                                style={{ width: "100px" }}
                                className="text-center"
                            >
                                Düzenle
                            </th>
                            <th
                                style={{ width: "100px" }}
                                className="text-center"
                            >
                                Sil
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles &&
                            profiles.map((profile) =>
                                newData && newData.id === profile.id ? (
                                    <tr key={newData.id}>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newData.domain_name}
                                                onChange={(e) =>
                                                    setNewData({
                                                        ...newData,
                                                        domain_name:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newData.google_account}
                                                onChange={(e) =>
                                                    setNewData({
                                                        ...newData,
                                                        google_account:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={newData.email}
                                                onChange={(e) =>
                                                    setNewData({
                                                        ...newData,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td className="text-center">
                                            <FaCheck
                                                className="text-success"
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                size={20}
                                                onClick={() =>
                                                    handleUpdate(newData.id)
                                                }
                                            />
                                        </td>
                                        <td className="text-center">
                                            <FaRegTrashAlt
                                                className="text-danger"
                                                size={20}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    handleDelete(newData.id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={profile.id}>
                                        <td>
                                            <Link
                                                to={`/profile/${profile.id}`}
                                                style={{
                                                    textDecoration: "none",
                                                    color: "black",
                                                }}
                                                className="domain_name"
                                            >
                                                {profile.domain_name}
                                            </Link>
                                        </td>
                                        <td>{profile.google_account}</td>
                                        <td>{profile.email}</td>
                                        <td className="text-center">
                                            <FaEdit
                                                className="text-primary"
                                                size={20}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    setNewData(profile)
                                                }
                                            />
                                        </td>
                                        <td className="text-center">
                                            <FaRegTrashAlt
                                                className="text-danger"
                                                size={20}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    handleDelete(profile.id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                )
                            )}
                    </tbody>
                </table>
            </div>
            <div className="col-6 ps-4">
                <SelectRank />
            </div>
        </div>
    );
}

export default Home;
