import axios from "axios"


export const GetMatchDetails = (id) => async dispatch  => {
    try {
        dispatch({
            type: "MATCH_DETAILS_LOADING"
        })
        const res = await axios.get(`http://127.0.0.1:8000/api/matches/${id}/`)

        dispatch({
            type: "MATCH_DETAILS_SUCCESS",
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: "MATCH_DETAILS_FAIL",
            errorMsg: e
        })
    }
}