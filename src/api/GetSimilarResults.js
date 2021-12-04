import axios from "axios"


export const GetSimilarResults = (spi1, spi2) => async dispatch  => {
    try {
        dispatch({
            type: "SIMILAR_LOADING"
        })
        const res = await axios.post('http://localhost:8000/api/predictions/similar/', {
            spi1: spi1,
            spi2: spi2
          });


        dispatch({
            type: "SIMILAR_SUCCESS",
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: "SIMILAR_FAIL",
            errorMsg: e
        })
    }
}