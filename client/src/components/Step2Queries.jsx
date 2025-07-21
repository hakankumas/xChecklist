import { useEffect, useState } from "react";
import axios from "axios";
function Step2Queries() {
    console.log("Step2Queries rendered.");
    const [questions, setQuestions] = useState([]);
    const handleData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/question/rank/0`
            );
            setQuestions(response.data.question);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleData();
    }, []);
    console.log(questions);
    return (
        <div>
            <div className="h2">Ek Sorular</div>
            {questions.length > 0 &&
                questions.map((question) => (
                    <div
                        key={question.id}
                        className="card q-select px-3 pt-3"
                        title="Ekle"
                    >
                        <p>{question.name}</p>
                    </div>
                ))}
        </div>
    );
}

export default Step2Queries;
