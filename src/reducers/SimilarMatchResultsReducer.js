const DefaultState = {
    loading: false,
    data: [],
    errorMsg: ""
}

const SimilarMatchResultsReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "SIMILAR_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            }
        case "SIMILAR_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: `Failed to load similar results. ${action.errorMsg}`
            }
        case "SIMILAR_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
                errorMsg: ""
            }
        default:
            return state
    }
}

export default SimilarMatchResultsReducer