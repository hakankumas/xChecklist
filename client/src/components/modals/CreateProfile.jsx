import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";
function CreateProfile({ setCreateNewProfile }) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setNewData({
            domain_name: "",
            google_account: "",
            email: "",
        });
    };

    const [newData, setNewData] = useState({
        domain_name: "",
        google_account: "",
        email: "",
    });
    const handleUpdate = async () => {
        if (newData.domain_name !== "") {
            try {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/profile-create`,
                    newData
                );
                handleClose();
                setCreateNewProfile(true);
            } catch (error) {
                console.error(error);
            }
        }
        return;
    };

    return (
        <>
            <Button variant="success btn-lg" onClick={handleShow}>
                <div className="d-flex align-items-center">
                    <FaUserPlus />
                    <span className="ms-2">Yeni Profil</span>
                </div>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Yeni Profil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Domain Adresi</label>
                        <input
                            type="text"
                            className="form-control"
                            value={newData.domain_name}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    domain_name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Google Hesabı</label>
                        <input
                            type="text"
                            className="form-control"
                            value={newData.google_account}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    google_account: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
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
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        onClick={() => handleUpdate()}
                        disabled={!newData.domain_name}
                    >
                        Tamam
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateProfile;
