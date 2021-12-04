import axios from "axios"


export const GetStandings = (season, league) => async dispatch  => {
    try {
        dispatch({
            type: "STANDINGS_LOADING"
        })
        const res = await axios.get(`http://127.0.0.1:8000/api/standings/?season=${season}&league=${league}`)

        dispatch({
            type: "STANDINGS_SUCCESS",
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: "STANDINGS_FAIL",
            errorMsg: e
        })
    }
}