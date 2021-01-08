import { combineReducers } from "redux";
import {authentication, refreshToken} from './user.reducer';
import {packetCountGraph, totalPackets} from './dashboard.reducer';

export default combineReducers({
    authentication,
    refreshToken,
    packetCount: packetCountGraph,
    totalPackets
});