import axios from "axios"


export const GetTeamsStats = (season, league, team1, team2) => async dispatch  => {
    try {
        dispatch({
            type: "TEAMS_STATS_LOADING"
        })
        const res_team1 = await axios.get(`http://localhost:8000/api/teams/stats/total/?season=${season}&league=${league}&team=${team1}`)
        const res_team2 = await axios.get(`http://localhost:8000/api/teams/stats/total/?season=${season}&league=${league}&team=${team2}`)

        dispatch({
            type: "TEAMS_STATS_SUCCESS",
            payload: {
                team1: res_team1.data,
                team2: res_team2.data
            }
        })
    } catch (e) {
        dispatch({
            type: "TEAMS_STATS_FAIL",
            errorMsg: e
        })
    }
}