import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

const MatchStats = () => {
    let location = useLocation()
    return (
        <div>
            match stats for: {location.state.team1} - {location.state.team2}
        </div>
    )
}

export default MatchStats