import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaQuestionCircle } from "react-icons/fa";
// import axios from "axios";
import { useCustomSnackBar } from "../../hooks/useCustomSnackBar";
import { useDispatch } from "react-redux";
import { create_question } from "../../redux/features/question/questionSlice";
function CreateQuestion() {
    console.log("CreateQuestion is worked.");
    const dispatch = useDispatch();
    const { snackBar_success, snackBar_error } = useCustomSnackBar();

    const [show, setShow] = useState(false);
    const [newData, setNewData] = useState({
        new_name: "",
        new_selection: "",
        new_note: "",
        new_rank: "",
    });
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setNewData({
            new_name: "",
            new_selection: "",
            new_note: "",
            new_rank: "",
        });
    };
    const handleCreate = async () => {
        try {
            const condition = {
                name: newData.new_name,
                selection: newData.new_selection.replace(/'/g, '"'),
                note: newData.new_note,
                rank: newData.new_rank,
            };
            dispatch(create_question(condition));
            snackBar_success();
            handleClose();
        } catch (error) {
            console.error(error);
            snackBar_error();
        }
    };

    return (
        <>
            <Button variant="primary btn-lg" onClick={handleShow}>
                <div className="d-flex align-items-center">
                    <FaQuestionCircle size={30} />
                </div>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Yeni Soru Oluştur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Soru</label>
                        <input
                            type="text"
                            className="form-control"
                            value={newData.new_question}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    new_name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Şıklar</label>
                        <input
                            type="text"
                            placeholder={`["Evet", "Hayır"]`}
                            className="form-control"
                            value={newData.new_answer}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    new_selection: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Not</label>
                        <input
                            type="text"
                            className="form-control"
                            value={newData.new_note}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    new_note: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rank</label>
                        <select
                            className="form-control"
                            value={newData.new_rank}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    new_rank: e.target.value,
                                })
                            }
                        >
                            <option value="0">Boşta</option>
                            <option value="1">Ön Analiz Raporu</option>
                            <option value="2">Detaylı Analiz Raporu</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCreate}>
                        Tamam
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateQuestion;
