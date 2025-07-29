import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegEnvelope, FaRegFilePdf } from "react-icons/fa";
import axios from "axios";
import { useCustomSnackBar } from "../../hooks/useCustomSnackBar";
function MailStep1({ data }) {
    console.log("MailStep1 is worked.");
    const { snackBar_success, snackBar_error } = useCustomSnackBar();

    const { id, domain_name, email } = data;
    const [sendMailTemplate, setSendMailTemplate] = useState({
        profile_id: id,
        step_no: 1,
        email: email,
        subject: `${domain_name} - Ön Analiz Raporu`,
        message: `Değerli müşterimiz merhaba. 
Web siteniz ${domain_name} için ön analiz işlemi gerçekleştirilmiştir. 
Raporunuz ek olarak gönderilmiştir. 
Detaylı bilgi almak için 0264 272 82 06 numaralı telefonu arayabilirsiniz.`,
    });

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setSendMailTemplate({
            profile_id: id,
            step_no: 1,
            email: email,
            subject: `${domain_name} - Ön Analiz Raporu`,
            message: `Değerli müşterimiz merhaba. 
Web siteniz ${domain_name} için ön analiz işlemi gerçekleştirilmiştir. 
Raporunuz ek olarak gönderilmiştir. 
Detaylı bilgi almak için 0264 272 82 06 numaralı telefonu arayabilirsiniz.`,
        });
    };

    const handleSendMail = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/mail/send`,
                sendMailTemplate
            );
            snackBar_success();
        } catch (error) {
            console.error(error);
            snackBar_error();
        }
        handleClose();
    };
    return (
        <>
            <Button
                variant="outline-success btn-lg border-0"
                onClick={handleShow}
            >
                <div className="d-flex align-items-center">
                    <FaRegEnvelope size={40} />
                </div>
            </Button>

            <Modal show={show} onHide={handleClose} className="modal-xl">
                <Modal.Header closeButton className="mx-4">
                    <Modal.Title>Ön Analiz Raporu - Mail Gönder</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="mb-3">
                        <label className="form-label">Kime</label>
                        <input
                            type="email"
                            className="form-control"
                            value={sendMailTemplate.email}
                            onChange={(e) => {
                                setSendMailTemplate({
                                    ...sendMailTemplate,
                                    email: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Konu</label>
                        <input
                            type="text"
                            className="form-control"
                            value={sendMailTemplate.subject}
                            onChange={(e) => {
                                setSendMailTemplate({
                                    ...sendMailTemplate,
                                    subject: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Açıklama</label>
                        <textarea
                            className="form-control"
                            rows="5"
                            value={sendMailTemplate.message}
                            onChange={(e) => {
                                setSendMailTemplate({
                                    ...sendMailTemplate,
                                    message: e.target.value,
                                });
                            }}
                        ></textarea>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="form-label">Ön Analiz Raporu</label>
                        <a
                            href={`${
                                import.meta.env.VITE_API_URL
                            }/pdf/${id}-1.pdf`}
                            target="_blank"
                            style={{ maxWidth: "max-content" }}
                            className="cursor-pointer"
                        >
                            <FaRegFilePdf
                                size={100}
                                color="red"
                                className="border p-3"
                            />
                        </a>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success btn-lg"
                        onClick={() => handleSendMail()}
                    >
                        Gönder
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MailStep1;
