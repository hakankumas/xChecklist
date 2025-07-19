import { useEffect, useState } from "react";
import axios from "axios";
function SelectRank() {
    console.log("SelectRank rendered.");
    const [questions, setQuestions] = useState([]);
    const handleData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/question/getall`
            );
            setQuestions(response.data.question);
        } catch (error) {
            console.log(error);
        }
    };
    const handleUpdate = async (question_id, rank_value) => {
        const result = window.confirm(`İşlemi Onaylıyor Musunuz?`);
        if (result) {
            try {
                const condition = {
                    id: question_id,
                    rank: rank_value,
                };
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/question/update/rank`,
                    condition
                );
                handleData();
            } catch (error) {
                console.log(error);
            }
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
        <div>
            {questions.length > 0 && (
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
                                <td className="px-4">{question.name}</td>
                                <td className="text-center">
                                    <select
                                        className="form-select"
                                        value={question.rank}
                                        onChange={(e) =>
                                            handleUpdate(
                                                question.id,
                                                e.target.value
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
            )}
        </div>
    );
}

export default SelectRank;
