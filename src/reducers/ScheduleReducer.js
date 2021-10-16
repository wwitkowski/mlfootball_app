const DefaultState = {
    loading: false,
    data: [],
    errorMsg: ""
}

const ScheduleReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "SCHEDULE_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            }
        case "SCHEDULE_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: "Failed to load Schedule."
            }
        case "SCHEDULE_SUCCESS":
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

export default ScheduleReducer