import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    FaQq,
    FaRegCheckCircle,
    FaRegEnvelope,
    FaRegFilePdf,
} from "react-icons/fa";
import {
    FaRegArrowAltCircleRight,
    FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import Step1Queries from "../components/Step1Queries";
import Step2Queries from "../components/Step2Queries";
import Step1QueriesSelected from "../components/Step1QueriesSelected";
import Step2QueriesSelected from "../components/Step2QueriesSelected";
import axios from "axios";
import Step1Answer from "../components/Step1Answer";
import Step2Answer from "../components/Step2Answer";
import Logs from "../components/Logs";
import ProfileInfo from "../components/ProfileInfo";
import MailStep1 from "../components/modals/MailStep1";
function Profile() {
    console.log("Profile is worked.");
    const { id } = useParams();
    const [selected_profile, setSelectedProfile] = useState([]);
    const handleProfile = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/profile/${id}`
        );
        setSelectedProfile(response.data.profile);
    };
    useEffect(() => {
        handleProfile();
    }, []);

    const handleProcess = async (id, step_id) => {
        if (selected_profile[0]?.step_no < step_id) {
            const result = window.confirm(
                "Sonraki adıma geçmek istiyor musunuz?"
            );
            if (!result) return;
        } else {
            const result = window.confirm(
                "Önceki adıma geri dönmek istiyor musunuz?"
            );
            if (!result) return;
        }

        const condition = {
            id,
            step_no: step_id,
        };
        await axios.post(
            `${import.meta.env.VITE_API_URL}/profile/update/stepno`,
            condition
        );
        handleProfile();
    };
    const handleGenerate = (step_id) => {
        console.log(step_id);
    };
    const handleSendMail = (step_id) => {
        console.log(step_id);
    };
    return (
        <div className="d-flex flex-row justify-content-between gap-5">
            <div
                className="col-3 rounded-4"
                style={{
                    height: "max-content",
                }}
            >
                {selected_profile.length > 0 ? (
                    <>
                        <ProfileInfo data={selected_profile[0]} />
                        {selected_profile[0].step_no === 0 && (
                            <div className="my-3 d-flex justify-content-end">
                                <button
                                    className="btn btn-lg btn-secondary"
                                    title="İleri"
                                    onClick={() =>
                                        handleProcess(selected_profile[0].id, 1)
                                    }
                                >
                                    <FaRegArrowAltCircleRight size={30} />
                                </button>
                            </div>
                        )}
                        {selected_profile[0].step_no === 1 && (
                            <div className="my-3 d-flex flex-row justify-content-between">
                                <div className="d-flex flex-row gap-3">
                                    <button
                                        className="btn btn-lg btn-success"
                                        title="Rapor Oluştur"
                                        onClick={() =>
                                            handleGenerate(
                                                selected_profile[0].id
                                            )
                                        }
                                    >
                                        <FaRegFilePdf size={30} />
                                    </button>
                                    <MailStep1 data={selected_profile[0]} />
                                </div>
                                <div className="d-flex flex-row gap-3">
                                    <button
                                        className="btn btn-lg btn-secondary"
                                        title="Geri"
                                        onClick={() =>
                                            handleProcess(
                                                selected_profile[0].id,
                                                0
                                            )
                                        }
                                    >
                                        <FaRegArrowAltCircleLeft size={30} />
                                    </button>
                                    <button
                                        className="btn btn-lg btn-secondary"
                                        title="İleri"
                                        onClick={() =>
                                            handleProcess(
                                                selected_profile[0].id,
                                                2
                                            )
                                        }
                                    >
                                        <FaRegArrowAltCircleRight size={30} />
                                    </button>
                                </div>
                            </div>
                        )}
                        {selected_profile[0].step_no === 2 && (
                            <div className="my-3 d-flex flex-row justify-content-between gap-3">
                                <div>
                                    <button
                                        className="btn btn-lg btn-danger"
                                        onClick={handleSendMail(2)}
                                        title="Rapor Gönder"
                                    >
                                        <FaRegEnvelope size={30} />
                                    </button>
                                </div>
                                <div className="d-flex flex-row gap-3">
                                    <button
                                        className="btn btn-lg btn-secondary"
                                        title="Geri"
                                        onClick={() =>
                                            handleProcess(
                                                selected_profile[0].id,
                                                1
                                            )
                                        }
                                    >
                                        <FaRegArrowAltCircleLeft size={30} />
                                    </button>
                                    <button
                                        className="btn btn-lg btn-primary"
                                        title="Tamamla"
                                        onClick={() =>
                                            handleProcess(
                                                selected_profile[0].id,
                                                3
                                            )
                                        }
                                    >
                                        <FaRegCheckCircle size={30} />
                                    </button>
                                </div>
                            </div>
                        )}
                        {selected_profile[0].step_no === 3 && (
                            <div className="my-3 d-flex flex-row justify-content-between gap-3">
                                <button
                                    className="btn btn-lg btn-danger"
                                    title="Yeniden Rapor Gönder"
                                    onClick={handleSendMail(2)}
                                >
                                    <FaRegEnvelope size={30} />
                                </button>
                                <button
                                    className="btn btn-lg btn-secondary"
                                    title="Geri"
                                    onClick={() =>
                                        handleProcess(selected_profile[0].id, 2)
                                    }
                                >
                                    <FaRegArrowAltCircleLeft size={30} />
                                </button>
                            </div>
                        )}
                        <hr className="my-4" />
                        <Logs id={id} />
                    </>
                ) : (
                    <p>Profil bilgileri yükleniyor...</p>
                )}
            </div>
            {selected_profile[0]?.step_no === 1 && (
                <>
                    <div className="col">
                        <Step1Answer id={id} />
                    </div>
                    <div className="col d-flex flex-column gap-4">
                        <Step1QueriesSelected id={id} />
                        <hr className="mb-0" />
                        <Step1Queries id={id} />
                    </div>
                </>
            )}
            {selected_profile[0]?.step_no === 2 && (
                <>
                    <div className="col">
                        <Step2Answer id={id} />
                    </div>
                    <div className="col d-flex flex-column gap-4">
                        <Step2QueriesSelected id={id} />
                        <hr className="mb-0" />
                        <Step2Queries id={id} />
                    </div>
                </>
            )}
            {selected_profile[0]?.step_no === 3 && (
                <div className="col d-block align-content-center text-center">
                    <p className="fs-1 fst-italic fw-bold text-success">
                        Analiz İşlemleri Tamamlanmıştır.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Profile;
