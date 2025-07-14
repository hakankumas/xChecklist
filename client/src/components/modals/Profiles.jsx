import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Profiles() {
    const [profiles, setProfiles] = useState([]);
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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Profiller
            </Button>

            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profiller</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-striped table-hover">
                        <thead style={{ border: "1px solid black" }}>
                            <tr>
                                <th>Domain Adresi</th>
                                <th>Google Hesabı</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles &&
                                profiles.map((profile) => (
                                    <tr key={profile.id}>
                                        <td>{profile.domain_name}</td>
                                        <td>{profile.google_account}</td>
                                        <td>{profile.email}</td>
                                    </tr>
                                ))}
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
