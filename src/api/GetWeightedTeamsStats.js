import axios from "axios"


export const GetWeightedTeamsStats = (league, team1, team2) => async dispatch  => {
    try {
        dispatch({
            type: "TEAMS_WEIGHTED_STATS_LOADING"
        })
        const count = 40
        const res_team1 = await axios.get(`http://localhost:8000/api/teams/stats/weighted/?league=${league}&team=${team1}&count=${count}`)
        const res_team2 = await axios.get(`http://localhost:8000/api/teams/stats/weighted/?league=${league}&team=${team2}&count=${count}`)

        dispatch({
            type: "TEAMS_WEIGHTED_STATS_SUCCESS",
            payload: {
                team1: res_team1.data,
                team2: res_team2.data
            }
        })
    } catch (e) {
        dispatch({
            type: "TEAMS_WEIGHTED_STATS_FAIL",
            errorMsg: e
        })
    }
}