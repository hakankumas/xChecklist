import { useEffect, useState } from "react";
import axios from "axios";
import { HiArrowTurnDownRight } from "react-icons/hi2";
import formatDate from "../hooks/useDateReturn";

function Logs({ id }) {
    const [logs, setLogs] = useState([]);
    const handleData = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/log/${id}`
        );
        setLogs(response.data.log);
    };
    useEffect(() => {
        handleData();
    }, [id]);
    return (
        <div
            className="shadow p-4 rounded-3"
            style={{ height: "40vh", overflowY: "auto" }}
        >
            <div className="text-center fs-3 mb-3">Sistem Bildirimleri</div>
            {logs?.map((log) => (
                <div className="alert alert-success py-1 px-2">
                    <div key={log.id}>
                        <small className="d-block text-start fst-italic fw-bold">
                            {formatDate(log.createdAt)}
                        </small>
                        <div className="d-flex align-items-end gap-2">
                            <span>
                                <HiArrowTurnDownRight size={30} />
                            </span>
                            <div className="fs-6">{log.log}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Logs;
