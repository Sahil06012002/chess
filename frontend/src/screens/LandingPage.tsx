import { useNavigate } from "react-router";
import Button from "../components/Button";

export default function LandingPage()
{
    const navigate = useNavigate();
    function onClick()
    {
        navigate('/game');
    }
    return <div className="h-screen flex justify-around items-center">
        <div>
            <img className="h-80" src="chess1.png" alt="chess" />
        </div>
        <div>
            <Button onclick={onClick}>Play Online</Button>
        </div>
    </div>
}