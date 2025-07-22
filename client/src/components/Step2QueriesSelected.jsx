import { useEffect } from "react";
import { useCustomSnackBar } from "../hooks/useCustomSnackBar";
import { useDispatch, useSelector } from "react-redux";
import {
    delete_answer2,
    getall_answer2,
} from "../redux/features/answer/answerSlice";

function Step2QueriesSelected({ id }) {
    console.log("Step2QueriesSelected rendered.");
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const dispatch = useDispatch();
    const { answers2 } = useSelector((state) => state.answer);
    useEffect(() => {
        dispatch(getall_answer2({ profile_id: id }));
    }, [dispatch, id]);

    const handleDeleteList = async (answer) => {
        try {
            await dispatch(delete_answer2(answer.id));
            snackBar_success();
        } catch (error) {
            console.error(error);
            snackBar_error();
        }
    };

    return (
        <div>
            <div className="h2">Detaylı Analiz Raporu Soruları</div>
            {answers2.length > 0 &&
                answers2.map((answer2) => (
                    <div
                        key={answer2.id}
                        className="border q-unselect px-3 pt-3"
                        title="Kaldır"
                        onClick={() => handleDeleteList(answer2)}
                    >
                        <p>{answer2.question_name}</p>
                    </div>
                ))}
        </div>
    );
}

export default Step2QueriesSelected;
