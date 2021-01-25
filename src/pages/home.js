import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

import LoadingAnimation from "./loadingAnimation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react/cjs/react.development";
import { getPacketGraph, getTotalPackets, getPortsCount, getTotalUsage } from "../state/actions/dashboard.actions";
import CountUp from "react-countup";

let CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return <div className="text-white">{payload[0].payload.count}</div>;
  }
};

const PORT_NAMES = {
  "53": "DNS",
  "443": "HTTPS",
  "80": "HTTP",
  "5353": "DNS",
  "67": "DHCP",
  "68": "DHCP",
  "123": "NTP",
  "139": "SMB",
  "138": "NetBios",
  "137": "NetBios",
}
const HomePage = () => {
  const dispatch = useDispatch();
  const packetCountGraphData = useSelector((state) => state.packetCount.data || []);
  const totalPacketsCount = useSelector((state) => state.totalPackets.data || 1000);
  const totalUsage = useSelector((state) => state.totalUsage.data || 1000);
  const portsCount = useSelector((state) => state.portsCount.data || []);

  useEffect(() => {
    dispatch(getPacketGraph());
    dispatch(getTotalPackets());
    dispatch(getTotalUsage());
    dispatch(getPortsCount());
    let i = setInterval(() => {
      dispatch(getPacketGraph());
      dispatch(getTotalUsage());
      dispatch(getTotalPackets());
      dispatch(getPortsCount());
    }, 800000);
    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <div className="flex-grow bg-gray-800">
      <div className="mt-10 ml-20 mr-20">
        <div className="grid grid-rows-6 gap-4 grid-cols-12">
          <div className="col-span-12 text-white text-xl font-bold font-mono">
            Packet count of the last 15 minutes.
          </div>
          <div
            className="row-span-6 col-span-9 bg-gradient-to-r shadow-md from-purple-400 to-purple-600 rounded"
            style={{
              maxWidth: "82vw",
            }}
          >
            <ResponsiveContainer>
              <AreaChart data={packetCountGraphData}>
                <defs>
                  <linearGradient id="packetCount" x1="0" y1="0" x2="0" y2="0">
                    <stop offset="5%" stopColor="#3E1C77" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#A587FA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip content={CustomTooltip} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#fff"
                  fill="url(#packetCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex row-span-2 col-span-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded">
            <div className="m-auto ml-5 mr-5">
              <p className="text-white text-2xl font-bold font-mono overflow-ellipsis overflow-x-hidden">
                <CountUp end={totalPacketsCount} separator={","} duration={6} />
              </p>
              <p className="font-bold font-mono text-gray-800 text-xl">
                Total packets.
              </p>
              <p className="font-bold font-mono text-gray-800 text-xs">
                A week span.
              </p>
            </div>
          </div>
          <div className="row-span-4 col-span-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded">
            <div className="divide-y-2 divide-white divide-dashed">
              <div className="m-auto ml-5 mr-5 mt-8">
                <div className="mb-10">
                  <p className="text-white text-2xl font-bold font-mono overflow-ellipsis overflow-x-hidden">
                    <CountUp end={totalUsage / 1024} separator={","} duration={6} />
                    GB
                  </p>
                  <p className="font-bold font-mono text-gray-80 text-xl">
                    Download Usage
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <p className="font-mono font-bold text-gray-800 text-xs ml-5">
                A week span.
              </p>
            </div>
          </div>
        </div>
        <div className="flex row-span-6 col-span-6 mt-5 bg-gradient-to-r from-purple-400 to-purple-600 rounded">
          <div className="mt-10 mb-10 ml-10 mr-5">
            <div className="grid grid-rows-1 gap-12 grid-cols-12">
              {console.log(portsCount)}
              {Object.keys(Object.entries(portsCount)
                .sort(([, a], [, b]) => a > b)
                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})).map(key => {
                  let count = portsCount[key];
                  return (<div className="row-span-2 col-span-2 shadow-2xl rounded">

                    <p className="text-yellow-200 text-2xl font-bold font-mono overflow-ellipsis overflow-x-hidden">
                      {PORT_NAMES[key]} ({key})
                  </p>
                    <p className="text-white text-2xl font-bold font-mono overflow-ellipsis overflow-x-hidden">
                      <CountUp end={count} separator=","/> Packets
                  </p>
                  </div>);
                })}

            </div>

          </div>
        </div>
      </div>
      {/* <div className="ml-32 mt-32">
        <p className="text-white text-xl">
          Packet count in the last 15 minutes
        </p>
        <div
          style={{ width: "100%", height: 300, width: "20vw", minWidth: 300 }}
          className="bg-gray-900 rounded-md"
        >

        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
