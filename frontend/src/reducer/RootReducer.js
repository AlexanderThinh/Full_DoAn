import { combineReducers } from "redux";
import infoCustomerReducer from "./InfoCustomerReducer";
import numReducer from "./NumReducer";
import typeUserLoginReducer from "./TypeUserLoginReducer";
import userReducer from "./UserReducer";

const mainReducer = combineReducers({
    user: userReducer,
    infoCustomer: infoCustomerReducer,
    typeUserLogin: typeUserLoginReducer,
    num: numReducer
})

export default mainReducer