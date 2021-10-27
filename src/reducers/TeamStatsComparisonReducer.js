const DefaultState = {
    loading: false,
    data: [],
    errorMsg: ""
}

const TeamStatsComparisonReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "MATCH_STATS_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            }
        case "MATCH_STATS_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: `Failed to load match stats. ${action.errorMsg}`
            }
        case "MATCH_STATS_SUCCESS":
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

export default TeamStatsComparisonReducer