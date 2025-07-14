import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CreateProfile() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Yeni Profil
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Yeni Profil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Domain Adresi</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Google Hesabı</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Tamam
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateProfile;
