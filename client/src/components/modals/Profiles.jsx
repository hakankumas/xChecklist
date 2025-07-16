import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { FaCheck, FaEdit, FaUser } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
function Profiles({ isNewProfile, setCreateNewProfile }) {
    console.log("Profiles worked.");
    const [show, setShow] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [newData, setNewData] = useState({
        id: "",
        domain_name: "",
        google_account: "",
        email: "",
    });

    const getData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/profile-getall`
            );
            setProfiles(response.data.profiles);
        } catch (error) {
            console.error("Veri çekme hatası:", error);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (isNewProfile) {
            getData();
            setCreateNewProfile(false);
        }
    }, [isNewProfile]);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setNewData({
            id: "",
            domain_name: "",
            google_account: "",
            email: "",
        });
    };
    const handleUpdate = async (id) => {
        const result = window.confirm(
            `Bu profili güncellemek istiyor musunuz?`
        );
        if (result) {
            try {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/profile-update`,
                    { ...newData, id }
                );
                getData();
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
                axios.get(
                    `${import.meta.env.VITE_API_URL}/profile-delete/${id}`
                );
                getData();
            } catch (error) {
                console.error(`Sistem Mesajı!: ${error}`);
            }
        }
    };
    return (
        <>
            <Button variant="primary btn-lg" onClick={handleShow}>
                <div className="d-flex align-items-center">
                    <FaUser />
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
                                            <td>{profile.domain_name}</td>
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
