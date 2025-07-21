import axios from "axios";
function Step1Queries({ id }) {
    console.log("Step1Queries rendered.");

    const handleAddList = async (question) => {
        try {
            const condition = {
                profile_id: id,
                question_id: question.id,
                question_name: question.name,
                rank: 1,
            };
            await axios.post(
                `${import.meta.env.VITE_API_URL}/answer/create`,
                condition
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="h2">Ek Sorular</div>
            {group0.length > 0 &&
                group0.map((question) => (
                    <div
                        key={question.id}
                        className="border q-select px-3 pt-3"
                        title="Ekle"
                        onClick={() => handleAddList(question)}
                    >
                        <p>{question.name}</p>
                    </div>
                ))}
        </div>
    );
}

export default Step1Queries;
