import { LuNotepadText } from "react-icons/lu";
import { FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    getall_answer2,
    update_answer2,
} from "../redux/features/answer/answerSlice";
import { useEffect, useState } from "react";
import { useCustomSnackBar } from "../hooks/useCustomSnackBar";

function Step2Answer({ id }) {
    console.log("Step2Answer rendered.");
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const dispatch = useDispatch();
    const { answers2 } = useSelector((state) => state.answer);

    useEffect(() => {
        dispatch(getall_answer2({ profile_id: id, rank: 2 }));
    }, [dispatch, id]);

    const [updateData, setUpdateData] = useState({
        id: null,
        field: "",
        value: "",
    });

    const handleUpdate = (id, data) => {
        try {
            dispatch(update_answer2({ id, data }));
            snackBar_success();
        } catch (error) {
            console.error(error);
            snackBar_error();
        }
    };

    return (
        <div style={{ height: "80vh", overflowY: "auto" }} className="px-3">
            {answers2.length > 0 &&
                answers2.map((answer) => (
                    <div className="shadow p-4 rounded-3 mb-3" key={answer.id}>
                        {/* Question */}
                        <div
                            className="d-flex flex-row align-items-center gap-2 alert alert-primary mb-2"
                            onDoubleClick={() =>
                                setUpdateData({
                                    id: answer.id,
                                    field: "question_name",
                                    value: answer.question_name || "",
                                })
                            }
                        >
                            <FaQuestionCircle size={30} className="col-1" />
                            {updateData.id === answer.id &&
                            updateData.field === "question_name" ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    value={updateData.value}
                                    onChange={(e) =>
                                        setUpdateData({
                                            ...updateData,
                                            value: e.target.value,
                                        })
                                    }
                                    onBlur={() => {
                                        handleUpdate(answer.id, {
                                            question_name: updateData.value,
                                        });
                                        setUpdateData({
                                            id: null,
                                            field: "",
                                            value: "",
                                        });
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <span className="fs-6">
                                    {answer.question_name}
                                </span>
                            )}
                        </div>

                        {/* Answer */}
                        <div
                            className="d-flex flex-row align-items-center gap-2 alert alert-success mb-2"
                            onDoubleClick={() =>
                                setUpdateData({
                                    id: answer.id,
                                    field: "answer_text",
                                    value: answer.answer_text || "",
                                })
                            }
                        >
                            <FaCheckCircle size={30} className="col-1" />
                            {updateData.id === answer.id &&
                            updateData.field === "answer_text" ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    value={updateData.value}
                                    onChange={(e) =>
                                        setUpdateData({
                                            ...updateData,
                                            value: e.target.value,
                                        })
                                    }
                                    onBlur={() => {
                                        handleUpdate(answer.id, {
                                            answer_text: updateData.value,
                                        });
                                        setUpdateData({
                                            id: null,
                                            field: "",
                                            value: "",
                                        });
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <span className="fs-6">
                                    {answer.answer_text || "-"}
                                </span>
                            )}
                        </div>

                        {/* Note */}
                        <div
                            className="d-flex flex-row align-items-center gap-2 alert alert-danger m-0"
                            onDoubleClick={() =>
                                setUpdateData({
                                    id: answer.id,
                                    field: "note",
                                    value: answer.note || "",
                                })
                            }
                        >
                            <LuNotepadText size={30} className="col-1" />
                            {updateData.id === answer.id &&
                            updateData.field === "note" ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    value={updateData.value}
                                    onChange={(e) =>
                                        setUpdateData({
                                            ...updateData,
                                            value: e.target.value,
                                        })
                                    }
                                    onBlur={() => {
                                        handleUpdate(answer.id, {
                                            note: updateData.value,
                                        });
                                        setUpdateData({
                                            id: null,
                                            field: "",
                                            value: "",
                                        });
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <span className="fs-6">
                                    {answer.note || "-"}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Step2Answer;
