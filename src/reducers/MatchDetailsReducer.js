const DefaultState = {
    loading: false,
    data: [],
    errorMsg: ""
}

const MatchDetailsReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "MATCH_DETAILS_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            }
        case "MATCH_DETAILS_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: `Failed to load league stats. ${action.errorMsg}`
            }
        case "MATCH_DETAILS_SUCCESS":
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

export default MatchDetailsReducer