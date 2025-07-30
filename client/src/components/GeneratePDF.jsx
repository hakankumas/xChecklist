import { FaRegFilePdf } from "react-icons/fa";
import axios from "axios";
import { useCustomSnackBar } from "../hooks/useCustomSnackBar";
function GeneratePDF({ data }) {
    console.log(data);
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const handleGenerate = async (profile_id, step_no) => {
        try {
            const condition = {
                profile_id,
                step_no,
            };
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/pdf/update`,
                condition
            );
            snackBar_success();
        } catch (error) {
            console.error(error);
            snackBar_error();
        }
    };
    return (
        <button
            className="btn btn-lg btn-outline-danger border-0"
            title="Rapor Oluştur"
            onClick={() => {
                handleGenerate(data.id, data.step_no);
            }}
        >
            <FaRegFilePdf size={40} />
        </button>
    );
}

export default GeneratePDF;
