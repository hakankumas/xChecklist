import { useDispatch, useSelector } from "react-redux";
function Step1QueriesSelected({ id }) {
    console.log("Step1QueriesSelected rendered.");
    const dispatch = useDispatch();
    const { group1 } = useSelector((state) => state.answer);

    const handleRemoveList = async (question) => {
        try {
            const condition = {
                profile_id: id,
                question_id: question.id,
            };
            dispatch(remove_answer(condition));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="h2">Ön Analiz Raporu Soruları</div>
            {group1.length > 0 &&
                group1.map((question) => (
                    <div
                        key={question.id}
                        className="border q-unselect px-3 pt-3"
                        title="Kaldır"
                        onClick={() => handleRemoveList(question)}
                    >
                        <p>{question.question_name}</p>
                    </div>
                ))}
        </div>
    );
}

export default Step1QueriesSelected;
