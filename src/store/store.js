import {createStore} from "redux";
import rootReducer from "./reducer/rootReducer";

// enter root store
const store = createStore(rootReducer)

export default store