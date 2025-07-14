import { useEffect, useState } from "react";
import axios from "axios";

function Admins() {
    const [admins, setAdmins] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/admins`
            );
            setAdmins(response.data.admins);
        } catch (error) {
            console.error("Veri çekme hatası:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>Admins</h1>
            {admins &&
                admins.map((admin) => (
                    <div
                        className="card text-start"
                        key={admin.id}
                        style={{
                            border: "1px solid black",
                            width: "200px",
                            padding: "0px 20px",
                        }}
                    >
                        <div className="card-body">
                            <h4 className="card-title">
                                <span>{admin.id + ".) "}</span>
                                <b>{admin.name + " " + admin.surname}</b>
                            </h4>
                            <p className="card-text">Yaş: {admin.age}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Admins;
