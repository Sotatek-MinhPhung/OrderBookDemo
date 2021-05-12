import {createStore} from "redux";
import index from "./reducer";

// enter root store
const store = createStore(index)

export default store