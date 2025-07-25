import { useEffect } from "react";
import { useCustomSnackBar } from "../hooks/useCustomSnackBar";
import { useDispatch, useSelector } from "react-redux";
import {
    delete_answer,
    getall_answer,
} from "../redux/features/answer/answerSlice";

function Step1QueriesSelected({ id }) {
    console.log("Step1QueriesSelected rendered.");
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const dispatch = useDispatch();
    const { answers } = useSelector((state) => state.answer);
    useEffect(() => {
        dispatch(getall_answer({ profile_id: id, rank: 1 }));
    }, [dispatch, id]);

    const handleDeleteList = async (answer) => {
        const result = window.confirm("Silme işlemini onaylıyor musunuz?");
        if (!result) return;
        try {
            await dispatch(delete_answer(answer.id));
            snackBar_success();
        } catch (error) {
            console.error(error);
            snackBar_error();
        }
    };

    return (
        <div style={{ height: "40vh", overflowY: "auto" }}>
            <div className="fs-3 fw-bold mb-2">Ön Analiz Raporu Soruları</div>
            {answers.length > 0 &&
                answers.map((answer) => (
                    <div
                        key={answer.id}
                        className="border q-unselect px-3 pt-2"
                        title="Kaldır"
                        onClick={() => handleDeleteList(answer)}
                    >
                        <p className="mb-2">{answer.question_name}</p>
                    </div>
                ))}
        </div>
    );
}

export default Step1QueriesSelected;
