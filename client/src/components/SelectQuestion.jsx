import { useEffect, useState } from "react";
import axios from "axios";
import { useCustomSnackBar } from "../hooks/useCustomSnackBar";
import { useDispatch, useSelector } from "react-redux";
import { getall_question } from "../redux/features/question/questionSlice";
import { FaCheck, FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
function SelectQuestion() {
    console.log("SelectQuestion worked.");
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const { all_questions } = useSelector((state) => state.question);
    const dispatch = useDispatch();
    const [editableId, setEditableId] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        name: "",
        selection: "",
        note: "",
    });

    const handleEdit = (id) => {
        setEditableId(id);
        const question = all_questions.find((q) => q.id === id);
        setUpdatedData({
            name: question.name,
            selection: question.selection,
            note: question.note,
        });
    };
    const handleUpdate = async (id) => {
        const result = window.confirm("İşlemi onaylıyor musunuz?");
        if (!result) return;
        try {
            const condition = {
                id,
                name: updatedData.name,
                selection: updatedData.selection,
                note: updatedData.note || "-",
            };
            await axios.post(
                `${import.meta.env.VITE_API_URL}/question/update`,
                condition
            );
            snackBar_success();
            dispatch(getall_question());
        } catch (error) {
            console.error("Güncellenirken hata:", error);
            snackBar_error();
        }
        setEditableId(null);
    };
    const handleUpdateRank = async (question_id, rank_value, currentRank) => {
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
    const handleUpdateSelected = async (id, selected) => {
        const result = window.confirm("İşlemi onaylıyor musunuz?");
        if (!result) return;
        try {
            const condition = {
                id,
                select: selected,
            };
            await axios.post(
                `${import.meta.env.VITE_API_URL}/question/update`,
                condition
            );
            snackBar_success();
            dispatch(getall_question());
        } catch (error) {
            console.error("Güncellenirken hata:", error);
            snackBar_error();
        }
    };

    const handleDelete = async (question_id) => {
        const result = window.confirm("İşlemi onaylıyor musunuz?");
        if (!result) return;
        try {
            await axios.get(
                `${import.meta.env.VITE_API_URL}/question/delete/${question_id}`
            );
            snackBar_success();
            dispatch(getall_question());
        } catch (error) {
            console.error("Rank güncelleme hatası:", error);
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
                            <th className="col-2 px-4">Cevaplar</th>
                            <th className="col-3 px-4">Not</th>
                            <th className="col-2 text-center">Rank</th>
                            <th className="col text-center">Düzenle</th>
                            <th className="col text-center">Sil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {all_questions.map((question) => {
                            return editableId === question.id ? (
                                <tr key={question.id}>
                                    <td className="px-4">
                                        <textarea
                                            className="form-control"
                                            value={updatedData.name}
                                            onChange={(e) =>
                                                setUpdatedData({
                                                    ...updatedData,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td className="px-4">
                                        <textarea
                                            className="form-control"
                                            value={updatedData.selection}
                                            onChange={(e) =>
                                                setUpdatedData({
                                                    ...updatedData,
                                                    selection: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td className="px-4">
                                        <textarea
                                            className="form-control"
                                            value={updatedData.note}
                                            onChange={(e) =>
                                                setUpdatedData({
                                                    ...updatedData,
                                                    note: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td className="text-center">
                                        <select
                                            className="form-select"
                                            value={String(question.rank)}
                                            onChange={(e) =>
                                                handleUpdateRank(
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
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline-success border-0"
                                            onClick={() =>
                                                handleUpdate(question.id)
                                            }
                                        >
                                            <FaCheck size={25} />
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline-danger border-0"
                                            onClick={() =>
                                                handleDelete(question.id)
                                            }
                                        >
                                            <RiDeleteBinLine size={25} />
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={question.id}>
                                    <td className="px-4">{question.name}</td>
                                    <td className="px-4">
                                        {question.selection &&
                                            JSON.parse(question.selection).map(
                                                (item, index) => (
                                                    <label
                                                        key={index}
                                                        style={{
                                                            display: "block",
                                                            marginBottom: "8px",
                                                        }}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={`answer-${question.id}`}
                                                            checked={
                                                                question.selected ===
                                                                item
                                                            }
                                                            value={item}
                                                            onChange={() =>
                                                                handleUpdateSelected(
                                                                    question.id,
                                                                    item
                                                                )
                                                            }
                                                        />
                                                        <span className="ms-2">
                                                            {item}
                                                        </span>
                                                    </label>
                                                )
                                            )}
                                    </td>
                                    <td className="px-4">{question.note}</td>
                                    <td className="text-center">
                                        <select
                                            className="form-select"
                                            value={String(question.rank)}
                                            onChange={(e) =>
                                                handleUpdateRank(
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
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline-success border-0"
                                            onClick={() => {
                                                handleEdit(question.id);
                                            }}
                                        >
                                            <FaEdit size={25} />
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline-danger border-0"
                                            onClick={() =>
                                                handleDelete(question.id)
                                            }
                                        >
                                            <RiDeleteBinLine size={25} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>Yükleniyor veya hiç soru bulunamadı.</p>
            )}
        </div>
    );
}

export default SelectQuestion;
