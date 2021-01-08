import { combineReducers } from "redux";
import {authentication, refreshToken} from './user.reducer';
import {packetCount} from './dashboard.reducer';

export default combineReducers({
    authentication,
    refreshToken,
    packetCount
});