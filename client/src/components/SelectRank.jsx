import { useEffect, useState } from "react";
import axios from "axios";
import { useCustomSnackBar } from "../hooks/useCustomSnackBar";
import { useDispatch, useSelector } from "react-redux";
import { getall_question } from "../redux/features/question/questionSlice";

function SelectRank() {
    console.log("SelectRank worked.");
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const { all_questions } = useSelector((state) => state.question);
    const dispatch = useDispatch();
    const [editableId, setEditableId] = useState(null);
    const [editedFields, setEditedFields] = useState({});

    const handleUpdate = async (question_id, rank_value, currentRank) => {
        if (rank_value === String(currentRank)) return;

        const result = window.confirm("İşlemi onaylıyor musunuz?");
        if (!result) return;

        try {
            const condition = {
                id: question_id,
                rank: rank_value,
            };
            await axios.post(
                `${import.meta.env.VITE_API_URL}/question/update/rank`,
                condition
            );
            snackBar_success();
            dispatch(getall_question());
        } catch (error) {
            console.error("Rank güncelleme hatası:", error);
            snackBar_error();
        }
    };

    const handleUpdateTexts = async (id, data, process_id) => {
        try {
            let condition = null;
            if (process_id === 1) condition = { id, name: data };
            if (process_id === 2) condition = { id, selector: data };
            if (process_id === 3) condition = { id, note: data ? data : "-" };
            if (process_id === 4) condition = { id, select: data };

            await axios.post(
                `${import.meta.env.VITE_API_URL}/question/update`,
                condition
            );
            if (process_id === 4) dispatch(getall_question());
            snackBar_success();
        } catch (error) {
            console.error("Güncellenirken hata:", error);
            snackBar_error();
        }
    };

    useEffect(() => {
        dispatch(getall_question());
    }, []);

    const rankOptions = [
        { value: "0", label: "Boşta" },
        { value: "1", label: "Ön Analiz Raporu" },
        { value: "2", label: "Detaylı Analiz Raporu" },
    ];

    return (
        <div className="overflow-y-scroll h-screen px-3">
            {all_questions.length > 0 ? (
                <table className="table table-hover shadow">
                    <thead>
                        <tr className="fs-5">
                            <th className="col-3 px-4">Soru</th>
                            <th className="col-3 px-4">Cevaplar</th>
                            <th className="col-3 px-4">Not</th>
                            <th className="col-3 text-center">Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {all_questions.map((question) => (
                            <tr key={question.id}>
                                {/* Soru Adı */}
                                <td
                                    className="px-4"
                                    onDoubleClick={() => {
                                        setEditedFields((prev) => ({
                                            ...prev,
                                            [question.id]: {
                                                name: question.name,
                                                note: question.note || "",
                                                selection: question.selection,
                                            },
                                        }));
                                        setEditableId(question.id);
                                    }}
                                >
                                    {editableId === question.id ? (
                                        <textarea
                                            className="form-control"
                                            value={
                                                editedFields[question.id]
                                                    ?.name || ""
                                            }
                                            onChange={(e) =>
                                                setEditedFields((prev) => ({
                                                    ...prev,
                                                    [question.id]: {
                                                        ...prev[question.id],
                                                        name: e.target.value,
                                                    },
                                                }))
                                            }
                                            onBlur={async () => {
                                                await handleUpdateTexts(
                                                    question.id,
                                                    editedFields[question.id]
                                                        ?.name,
                                                    1
                                                );
                                                dispatch(getall_question());
                                                setEditableId(null);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter")
                                                    e.target.blur();
                                            }}
                                        />
                                    ) : (
                                        question.name
                                    )}
                                </td>

                                {/* Seçenek Alanı */}
                                <td
                                    className="px-4"
                                    onDoubleClick={() => {
                                        setEditedFields((prev) => ({
                                            ...prev,
                                            [question.id]: {
                                                name: question.name,
                                                note: question.note,
                                                selection:
                                                    question.selection || "",
                                            },
                                        }));
                                        setEditableId(question.id);
                                    }}
                                >
                                    {editableId === question.id ? (
                                        <textarea
                                            className="form-control"
                                            value={
                                                editedFields[question.id]
                                                    ?.selection || ""
                                            }
                                            onChange={(e) =>
                                                setEditedFields((prev) => ({
                                                    ...prev,
                                                    [question.id]: {
                                                        ...prev[question.id],
                                                        selection:
                                                            e.target.value,
                                                    },
                                                }))
                                            }
                                            onBlur={async () => {
                                                await handleUpdateTexts(
                                                    question.id,
                                                    editedFields[question.id]
                                                        ?.selection,
                                                    2
                                                );
                                                dispatch(getall_question());
                                                setEditableId(null);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter")
                                                    e.target.blur();
                                            }}
                                        />
                                    ) : // prettier-ignore
                                    question.selection ? JSON.parse(question.selection).map((item, index) => (
                                            <label key={index} style={{display: "block", marginBottom: "8px",}}>
                                                <input
                                                    type="radio"
                                                    name={`answer-${question.id}`}
                                                    checked={question.selected === item}
                                                    value={item}
                                                    onChange={() => handleUpdateTexts(question.id, item, 4)}
                                                />
                                                <span className="ms-2">{item}</span>
                                            </label>
                                        )
                                    ) : (
                                        "-"
                                    )}
                                </td>

                                {/* Not Alanı */}
                                <td
                                    className="px-4"
                                    onDoubleClick={() => {
                                        setEditedFields((prev) => ({
                                            ...prev,
                                            [question.id]: {
                                                name: question.name,
                                                note: question.note || "",
                                                selection: question.selection,
                                            },
                                        }));
                                        setEditableId(question.id);
                                    }}
                                >
                                    {editableId === question.id ? (
                                        <textarea
                                            className="form-control"
                                            value={
                                                editedFields[question.id]
                                                    ?.note || ""
                                            }
                                            onChange={(e) =>
                                                setEditedFields((prev) => ({
                                                    ...prev,
                                                    [question.id]: {
                                                        ...prev[question.id],
                                                        note: e.target.value,
                                                    },
                                                }))
                                            }
                                            onBlur={async () => {
                                                await handleUpdateTexts(
                                                    question.id,
                                                    editedFields[question.id]
                                                        ?.note,
                                                    3
                                                );
                                                dispatch(getall_question());
                                                setEditableId(null);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter")
                                                    e.target.blur();
                                            }}
                                        />
                                    ) : question.note ? (
                                        question.note
                                    ) : (
                                        "-"
                                    )}
                                </td>

                                {/* Rank Seçimi */}
                                <td className="text-center">
                                    <select
                                        className="form-select"
                                        value={String(question.rank)}
                                        onChange={(e) =>
                                            handleUpdate(
                                                question.id,
                                                e.target.value,
                                                question.rank
                                            )
                                        }
                                    >
                                        {rankOptions.map((opt) => (
                                            <option
                                                key={opt.value}
                                                value={opt.value}
                                            >
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Yükleniyor veya hiç soru bulunamadı.</p>
            )}
        </div>
    );
}

export default SelectRank;
