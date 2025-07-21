import { useEffect, useState } from "react";
import axios from "axios";

function SelectRank() {
    console.log("SelectRank rendered.");
    const [questions, setQuestions] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedNames, setEditedNames] = useState({});

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
            await handleData();
        } catch (error) {
            console.error("Rank güncelleme hatası:", error);
        }
    };

    const handleUpdateQuestionName = async (id, name) => {
        try {
            const condition = { id, name };
            await axios.post(
                `${import.meta.env.VITE_API_URL}/question/update`,
                condition
            );
        } catch (error) {
            console.error("Soru adı güncellenirken hata:", error);
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
                            <th scope="col" className="px-4">
                                Soru
                            </th>
                            <th scope="col" className="col-4 text-center">
                                Rank
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question) => (
                            <tr key={question.id}>
                                <td
                                    className="px-4"
                                    onDoubleClick={() => {
                                        setEditableId(question.id);
                                        setEditedNames((prev) => ({
                                            ...prev,
                                            [question.id]: question.name,
                                        }));
                                    }}
                                >
                                    {editableId === question.id ? (
                                        <textarea
                                            className="form-control"
                                            value={
                                                editedNames[question.id] ?? ""
                                            }
                                            onChange={(e) =>
                                                setEditedNames((prev) => ({
                                                    ...prev,
                                                    [question.id]:
                                                        e.target.value,
                                                }))
                                            }
                                            onBlur={async () => {
                                                await handleUpdateQuestionName(
                                                    question.id,
                                                    editedNames[question.id]
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
