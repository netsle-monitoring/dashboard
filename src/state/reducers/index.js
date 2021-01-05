import { combineReducers } from "redux";
import {authentication, refreshToken} from './user.reducer';

export default combineReducers({
    authentication,
    refreshToken
});