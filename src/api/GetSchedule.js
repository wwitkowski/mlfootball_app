import axios from "axios"


export const GetSchedule = (date) => async dispatch  => {
    try {
        dispatch({
            type: "SCHEDULE_LOADING"
        })
        //const res = await axios.get(`http://127.0.0.1:8000/api/matches/${date.toISOString().split('T')[0]}/`)
        const res = await axios.get(`http://127.0.0.1:8000/api/matches/${date}/`)

        dispatch({
            type: "SCHEDULE_SUCCESS",
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: "SCHEDULE_FAIL"
        })
    }
}