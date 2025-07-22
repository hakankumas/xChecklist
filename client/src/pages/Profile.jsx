import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegCheckCircle, FaRegEnvelope } from "react-icons/fa";
import {
    FaRegArrowAltCircleRight,
    FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import Step1Queries from "../components/Step1Queries";
import Step2Queries from "../components/Step2Queries";
import Step1QueriesSelected from "../components/Step1QueriesSelected";
import Step2QueriesSelected from "../components/Step2QueriesSelected";
import axios from "axios";
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

    const handleReport = (step_id) => {
        console.log(`handleReport ${step_id}`);
    };
    const handleProcess = async (id, step_id) => {
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
    const stepTexts = {
        0: "Analizi Başlat",
        1: "Ön Analiz",
        2: "Detaylı Analiz",
        3: "Analiz Tamamlandı",
    };
    return (
        <div className="d-flex flex-row justify-content-between">
            <div
                className="col-3 px-5 py-2 shadow rounded-4"
                style={{
                    height: "max-content",
                }}
            >
                {selected_profile.length > 0 ? (
                    <>
                        <div className="card shadowx p-3 my-3">
                            <div className="card-body">
                                <h5 className="card-title text-center fs-3 mb-3">
                                    Profil Bilgileri
                                </h5>
                                <p className="card-text mb-2">
                                    <span>Domain Adı: </span>
                                    <br />
                                    <strong>
                                        {selected_profile[0].domain_name}
                                    </strong>
                                </p>
                                <p className="card-text mb-2">
                                    <span>Google Hesabı: </span>
                                    <br />
                                    <strong>
                                        {selected_profile[0].google_account}
                                    </strong>
                                </p>
                                <p className="card-text mb-2">
                                    <span>Email: </span>
                                    <br />
                                    <strong>{selected_profile[0].email}</strong>
                                </p>
                            </div>
                            <hr className="m-0 mb-3" />
                            <div className="text-danger text-center fnt-italic fw-bold fs-5">
                                {stepTexts[selected_profile[0]?.step_no] ||
                                    "Bilinmeyen Adım"}
                            </div>
                        </div>
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
                            <div className="my-3 d-flex flex-row justify-content-between gap-3">
                                <div>
                                    <button
                                        className="btn btn-lg btn-danger"
                                        title="Rapor Gönder"
                                        onClick={handleReport(1)}
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
                                        onClick={handleReport(2)}
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
                                    onClick={handleReport(2)}
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
                    </>
                ) : (
                    <p>Profil bilgileri yükleniyor...</p>
                )}
            </div>
            {selected_profile[0]?.step_no === 1 && (
                <div className="col-4">
                    <Step1QueriesSelected id={id} />
                </div>
            )}
            {selected_profile[0]?.step_no === 1 && (
                <div className="col-4">
                    <Step1Queries id={id} />
                </div>
            )}
            {selected_profile[0]?.step_no === 2 && (
                <div className="col-4">
                    <Step2QueriesSelected id={id} />
                </div>
            )}
            {selected_profile[0]?.step_no === 2 && (
                <div className="col-4">
                    <Step2Queries id={id} />
                </div>
            )}
        </div>
    );
}

export default Profile;
