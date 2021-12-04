const DefaultState = {
    loading: false,
    data: [],
    errorMsg: ""
}

const TeamStatsWeightedReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "TEAMS_WEIGHTED_STATS_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            }
        case "TEAMS_WEIGHTED_STATS_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: `Failed to load weighted stats. ${action.errorMsg}`
            }
        case "TEAMS_WEIGHTED_STATS_SUCCESS":
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

export default TeamStatsWeightedReducer