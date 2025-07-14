import { useEffect, useState } from "react";
import axios from "axios";
function Home() {
    const [userMessage, setUserMessage] = useState("");
    const getData = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/`);
        setUserMessage(response.data.message);
        console.log(userMessage);
    };

    useEffect(() => {
        getData();
    }, []);
    return <div> {userMessage}</div>;
}

export default Home;
