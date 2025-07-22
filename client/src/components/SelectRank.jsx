import { useEffect, useState } from "react";
import axios from "axios";
import { useCustomSnackBar } from "../hooks/useCustomSnackBar";

function SelectRank() {
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const [questions, setQuestions] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedFields, setEditedFields] = useState({});

    const handleData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/question/getall`
            );
            setQuestions(response.data.question);
        } catch (error) {
            console.error("Veri alınırken hata:", error);
        }
    };

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
            await handleData();
        } catch (error) {
            console.error("Rank güncelleme hatası:", error);
            snackBar_error();
        }
    };

    const handleUpdateQuestionName = async (id, name) => {
        try {
            const condition = { id, name };
            await axios.post(
                `${import.meta.env.VITE_API_URL}/question/update`,
                condition
            );
            snackBar_success();
        } catch (error) {
            console.error("Soru adı güncellenirken hata:", error);
            snackBar_error();
        }
    };

    const handleUpdateQuestionNote = async (id, note) => {
        try {
            const condition = { id, note };
            await axios.post(
                `${import.meta.env.VITE_API_URL}/question/update`,
                condition
            );
            snackBar_success();
        } catch (error) {
            console.error("Not güncellenirken hata:", error);
            snackBar_error();
        }
    };

    useEffect(() => {
        handleData();
    }, []);

    const rankOptions = [
        { value: "0", label: "Boşta" },
        { value: "1", label: "Ön Analiz Raporu" },
        { value: "2", label: "Detaylı Analiz Raporu" },
    ];

    return (
        <div className="overflow-y-scroll h-screen px-3">
            {questions.length > 0 ? (
                <table className="table table-hover shadow">
                    <thead>
                        <tr className="fs-5">
                            <th className="col-5 px-4">Soru</th>
                            <th className="col-4 px-4">Not</th>
                            <th className="col-3 text-center">Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question) => (
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
                                                await handleUpdateQuestionName(
                                                    question.id,
                                                    editedFields[question.id]
                                                        ?.name
                                                );
                                                await handleData();
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

                                {/* Not Alanı */}
                                <td
                                    className="px-4"
                                    onDoubleClick={() => {
                                        setEditedFields((prev) => ({
                                            ...prev,
                                            [question.id]: {
                                                name: question.name,
                                                note: question.note || "",
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
                                                await handleUpdateQuestionNote(
                                                    question.id,
                                                    editedFields[question.id]
                                                        ?.note
                                                );
                                                await handleData();
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
