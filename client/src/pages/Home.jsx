import SelectQuestion from "../components/SelectQuestion";
import SelectProfile from "../components/SelectProfile";
function Home() {
    console.log("Home worked.");

    return (
        <div className="row">
            <div className="col-4 pe-4">
                <SelectProfile />
            </div>
            <div className="col-8 ps-4">
                <SelectQuestion />
            </div>
        </div>
    );
}

export default Home;
