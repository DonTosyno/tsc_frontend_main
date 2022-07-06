import ThemeReducer from "./ThemeReducer"
import { combineReducers } from "redux"

 
const rootReducer = combineReducers({ThemeReducer})
export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer