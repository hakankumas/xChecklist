import { useEffect, useState } from "react";
import axios from "axios";
function Step1QueriesSelected({ id }) {
    console.log("Step1QueriesSelected rendered.");
    const [selected_questions, setSelectedQuestions] = useState([]);
    const [addedQuestionIds, setAddedQuestionIds] = useState([]);
    const handleData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/answer/getall/${id}/1`
            );
            setSelectedQuestions(response.data.answer);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleData();
    }, []);

    const handleRemoveList = async () => {
        console.log("x");
    };

    useEffect(() => {
        handleRemoveList();
    }, [addedQuestionIds]);
    console.log(selected_questions);
    return (
        <div>
            <div className="h2">Ön Analiz Raporu Soruları</div>
            {selected_questions.length > 0 &&
                selected_questions.map((question) => (
                    <div
                        key={question.id}
                        className="card q-unselect px-3 pt-3"
                        title="Kaldır"
                        onClick={() => {
                            if (!addedQuestionIds.includes(question.id)) {
                                setAddedQuestionIds((prev) => [
                                    ...prev,
                                    question.id,
                                ]);
                            }
                        }}
                    >
                        <p>{question.question_name}</p>
                    </div>
                ))}
        </div>
    );
}

export default Step1QueriesSelected;
