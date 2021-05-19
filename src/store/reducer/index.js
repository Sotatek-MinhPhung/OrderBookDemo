import {combineReducers} from "redux";
import connectReducer from "./connectReducer";

const index = combineReducers({
    connect: connectReducer
})

export default index