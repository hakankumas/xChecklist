import { useEffect, useState } from "react";
import axios from "axios";
function Step2QueriesSelected({ id }) {
    console.log("Step2QueriesSelected rendered.");
    const [selected_questions, setSelectedQuestions] = useState([]);
    const handleData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/answer/getall/${id}/2`
            );
            setSelectedQuestions(response.data.answer);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleData();
    }, []);
    console.log(selected_questions);
    return (
        <div>
            <div className="h2">Detaylı Analiz Raporu Soruları</div>
            {selected_questions.length > 0 &&
                selected_questions.map((question) => (
                    <div
                        key={question.id}
                        className="card q-unselect px-3 pt-3"
                        title="Kaldır"
                    >
                        <p>{question.question_name}</p>
                    </div>
                ))}
        </div>
    );
}

export default Step2QueriesSelected;
