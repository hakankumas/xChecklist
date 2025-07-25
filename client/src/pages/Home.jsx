import SelectRank from "../components/SelectRank";
import SelectProfile from "../components/SelectProfile";
function Home() {
    console.log("Home worked.");

    return (
        <div className="row">
            <div className="col-5 pe-4">
                <SelectProfile />
            </div>
            <div className="col-7 ps-4">
                <SelectRank />
            </div>
        </div>
    );
}

export default Home;
