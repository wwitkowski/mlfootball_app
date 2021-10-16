import { combineReducers } from "redux";
import ScheduleReducer from "./ScheduleReducer";

const RootReducer = combineReducers({
    Schedule: ScheduleReducer
})

export default RootReducer