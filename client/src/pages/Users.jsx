import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
    const [users, setUsers] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/users`
            );
            setUsers(response.data.users);
        } catch (error) {
            console.error("Veri çekme hatası:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            {users &&
                users.map((user) => (
                    <div
                        className="card text-start"
                        key={user.id}
                        style={{
                            border: "1px solid black",
                            width: "200px",
                            padding: "0px 20px",
                        }}
                    >
                        <div className="card-body">
                            <h4 className="card-title">
                                <span>{user.id + ".) "}</span>
                                <b>{user.name + " " + user.surname}</b>
                            </h4>
                            <p className="card-text">Yaş: {user.age}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Users;
