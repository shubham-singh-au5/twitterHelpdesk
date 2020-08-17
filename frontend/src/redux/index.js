import appReducer from "./appReducer"
import { combineReducers } from "redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk";

let rootReducer = combineReducers({ appReducer })
export default createStore(rootReducer, applyMiddleware(thunk))