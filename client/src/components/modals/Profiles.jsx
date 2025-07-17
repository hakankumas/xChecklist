import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaCheck, FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteProfile,
    getAllProfile,
    updateProfile,
} from "../../redux/features/profile/profileSlice";

function Profiles() {
    console.log("Profiles worked.");
    const { profiles } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProfile());
    }, [dispatch]);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [newData, setNewData] = useState({
        id: "",
        domain_name: "",
        google_account: "",
        email: "",
    });
    const handleClose = () => {
        setShow(false);
        setNewData({
            id: "",
            domain_name: "",
            google_account: "",
            email: "",
        });
    };
    const handleUpdate = async () => {
        const result = window.confirm(
            `Bu profili güncellemek istiyor musunuz?`
        );
        if (result) {
            try {
                dispatch(updateProfile(newData));
            } catch (error) {
                console.error(`Sistem Mesajı!: ${error}`);
            }
        }
        setNewData({
            id: "",
            domain_name: "",
            google_account: "",
            email: "",
        });
    };
    const handleDelete = (id) => {
        const result = window.confirm(
            `Bu profili silmek istiyor musunuz? ID: ${id}`
        );
        if (result) {
            try {
                dispatch(deleteProfile(id));
            } catch (error) {
                console.error(`Sistem Mesajı!: ${error}`);
            }
        }
    };

    return (
        <>
            <Button variant="primary btn-lg" onClick={handleShow}>
                <div className="d-flex align-items-center">
                    <MdGroups size={30} />
                    <span className="ms-2">Profiller</span>
                </div>
            </Button>

            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profiller</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-striped___ table-hover">
                        <thead style={{ border: "1px solid black" }}>
                            <tr>
                                <th style={{ width: "30%" }}>Domain Adresi</th>
                                <th style={{ width: "25%" }}>Google Hesabı</th>
                                <th style={{ width: "25%" }}>Email</th>
                                <th
                                    style={{ width: "10%" }}
                                    className="text-center"
                                >
                                    Düzenle
                                </th>
                                <th
                                    style={{ width: "10%" }}
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
                                                    value={
                                                        newData.google_account
                                                    }
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
                                                            email: e.target
                                                                .value,
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
                                                    onClick={handleClose}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Profiles;
