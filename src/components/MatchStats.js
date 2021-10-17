import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { useEffect } from "react"
import { GetMatchStats } from "../api/GetMatchStats"


const MatchStats = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const matchStats = useSelector(state => state.MatchStats)

    useEffect(() => {
        FetchData(
            location.state.season,
            location.state.league,
            location.state.team1,
            location.state.team2
        )
        
      }, [])

    const FetchData = (season, league, team1, team2) => {
        dispatch(GetMatchStats(season, league, team1, team2))
    }

    const showMatchStats = () => {
        if (matchStats.loading) {
            return <p>Loading...</p>
        }
        if (!_.isEmpty(matchStats.data)) {
            
            return <div>
                <h3>{matchStats.data.team1.team.name} stats:</h3>
                { Object.keys(matchStats.data.team1.total).map((stat) => (
                    <p> {stat}: {matchStats.data.team1.total[stat] / matchStats.data.team1.total["played"]} </p>
                ))}
                <h3>{matchStats.data.team2.team.name} stats:</h3>
                { Object.keys(matchStats.data.team2.total).map((stat) => (
                    <p> {stat}: {matchStats.data.team2.total[stat] / matchStats.data.team2.total["played"]} </p>
                ))}
            </div>
        }
        if (matchStats.errorMsg !== "") {
            return <p>{matchStats.errorMsg}</p>
        }

        return <p>Unable to return match stats.</p>
    }

    return (
        <div>
            {showMatchStats()}
        </div>
    )
}

export default MatchStats