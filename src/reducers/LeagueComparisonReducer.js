const DefaultState = {
    loading: false,
    data: [],
    errorMsg: ""
}

const LeagueComparisonReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "STANDINGS_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            }
        case "STANDINGS_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: `Failed to load league stats. ${action.errorMsg}`
            }
        case "STANDINGS_SUCCESS":
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

export default LeagueComparisonReducer