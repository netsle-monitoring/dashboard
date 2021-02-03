import { combineReducers } from "redux";
import {authentication, refreshToken, signout} from './user.reducer';
import {packetCountGraph, totalPackets, totalUsage, portsCount} from './dashboard.reducer';

export default combineReducers({
    authentication,
    refreshToken,
    packetCount: packetCountGraph,
    totalPackets,
    totalUsage,
    portsCount,
    signout
});