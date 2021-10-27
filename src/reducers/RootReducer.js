import { combineReducers } from "redux";
import TeamStatsComparisonReducer from "./TeamStatsComparisonReducer";
import ScheduleReducer from "./ScheduleReducer";

const RootReducer = combineReducers({
    Schedule: ScheduleReducer,
    TeamStatsComparison: TeamStatsComparisonReducer
})

export default RootReducer