import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaUserPlus } from "react-icons/fa";
// import axios from "axios";
import { useCustomSnackBar } from "../../hooks/useCustomSnackBar";
import { useDispatch } from "react-redux";
import { createProfile } from "../../redux/features/profile/profileSlice";
function CreateProfile() {
    console.log("CreateProfile is worked.");
    const dispatch = useDispatch();
    const { snackBar_success, snackBar_error } = useCustomSnackBar();

    const [show, setShow] = useState(false);
    const [newData, setNewData] = useState({
        domain_name: "adanetajans.com",
        google_account: "Adanet 1",
        email: "info@adanetajans.com",
    });
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setNewData({
            domain_name: "adanetajans.com",
            google_account: "Adanet 1",
            email: "info@adanetajans.com",
        });
    };
    const handleCreate = async () => {
        if (newData.domain_name.trim() !== "") {
            try {
                dispatch(createProfile(newData));
                snackBar_success();
                handleClose();
            } catch (error) {
                console.error(error);
                snackBar_error();
            }
        }
    };

    return (
        <>
            <Button variant="success btn-lg" onClick={handleShow}>
                <div className="d-flex align-items-center">
                    <FaUserPlus size={30} />
                </div>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Yeni Profil Oluştur</Modal.Title>
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
                        onClick={handleCreate}
                        disabled={!newData.domain_name.trim()}
                    >
                        Tamam
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateProfile;
