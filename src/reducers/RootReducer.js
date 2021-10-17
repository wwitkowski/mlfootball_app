import { combineReducers } from "redux";
import MatchStatsReducer from "./MatchStatsReducer";
import ScheduleReducer from "./ScheduleReducer";

const RootReducer = combineReducers({
    Schedule: ScheduleReducer,
    MatchStats: MatchStatsReducer
})

export default RootReducer