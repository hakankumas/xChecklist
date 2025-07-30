import { useEffect } from "react";
import { useCustomSnackBar } from "../hooks/useCustomSnackBar";
import { useDispatch, useSelector } from "react-redux";
import { get_rank_0 } from "../redux/features/question/questionSlice";
import { create_answer2 } from "../redux/features/answer/answerSlice";
function Step2Queries({ id }) {
    console.log("Step2Queries rendered.");
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const dispatch = useDispatch();
    const { free_questions } = useSelector((state) => state.question);
    const { answers2 } = useSelector((state) => state.answer);
    useEffect(() => {
        dispatch(get_rank_0());
    }, [dispatch, id]);
    const handleCreate = async (question) => {
        try {
            const condition = {
                profile_id: id,
                question_id: question.id,
                question_name: question.name,
                selection: question.selection,
                selected: question.selected,
                note: question.note,
                rank: 2,
            };
            dispatch(create_answer2(condition));
            snackBar_success();
        } catch (error) {
            console.error(error);
            snackBar_error();
        }
    };

    // Eklenmiş question_id'leri çıkar
    const addedQuestionIds = answers2.map((a) => a.question_id);

    // Filtrelenmiş sorular
    const filteredQuestions = free_questions.filter(
        (q) => !addedQuestionIds.includes(q.id)
    );

    return (
        <div style={{ height: "40vh", overflowY: "auto" }}>
            <div className="fs-3 fw-bold mb-2">Ek Sorular</div>
            {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                    <div
                        key={question.id}
                        className="border q-select px-3 pt-2"
                        title="Ekle"
                        onClick={() => handleCreate(question)}
                    >
                        <p className="mb-2">{question.name}</p>
                    </div>
                ))
            ) : (
                <p className="alert alert-success">Tüm sorular eklendi.</p>
            )}
        </div>
    );
}

export default Step2Queries;
