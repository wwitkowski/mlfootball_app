import { combineReducers } from "redux";
import TeamStatsComparisonReducer from "./TeamStatsComparisonReducer";
import ScheduleReducer from "./ScheduleReducer";
import LeagueComparisonReducer from "./LeagueComparisonReducer";
import MatchDetailsReducer from "./MatchDetailsReducer";
import TeamStatsWeightedReducer from "./TeamsStatsWeightedReducer";
import SimilarMatchResultsReducer from "./SimilarMatchResultsReducer";

const RootReducer = combineReducers({
    Schedule: ScheduleReducer,
    TeamStatsComparison: TeamStatsComparisonReducer,
    LeagueComparison: LeagueComparisonReducer,
    MatchDetails: MatchDetailsReducer,
    TeamStatsWeighted: TeamStatsWeightedReducer,
    SimilarMatchResults: SimilarMatchResultsReducer
})

export default RootReducer