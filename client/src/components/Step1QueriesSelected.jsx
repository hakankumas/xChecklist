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
        try {
            await dispatch(delete_answer(answer.id));
            snackBar_success();
        } catch (error) {
            console.error(error);
            snackBar_error();
        }
    };

    return (
        <div>
            <div className="h2">Ön Analiz Raporu Soruları</div>
            {answers.length > 0 &&
                answers.map((answer) => (
                    <div
                        key={answer.id}
                        className="border q-unselect px-3 pt-3"
                        title="Kaldır"
                        onClick={() => handleDeleteList(answer)}
                    >
                        <p>{answer.question_name}</p>
                    </div>
                ))}
        </div>
    );
}

export default Step1QueriesSelected;
