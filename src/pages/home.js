import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

import LoadingAnimation from "./loadingAnimation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react/cjs/react.development";
import { getPacketCount } from "../state/actions/dashboard.actions";
import CountUp from "react-countup";

let CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    console.log("PAYLOAD", payload);
    return <div className="text-white">{payload[0].payload.count}</div>;
  }
};

const HomePage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.packetCount.data || []);
  const packetCountStatus = useSelector((state) => state.packetCount.status);

  useEffect(() => {
    dispatch(getPacketCount());
    let i = setInterval(() => dispatch(getPacketCount()), 60000);
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
              <AreaChart data={data}>
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
                <CountUp end={10000000000000000} separator={","} duration={6} />
              </p>
              <p className="font-bold font-mono text-gray-800 text-xl">
                Total packets.
              </p>
              <p className="font-bold font-mono text-gray-800 text-xs">
                A week span.
              </p>
            </div>
          </div>
          <div className="row-span-5 col-span-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded">
            <div className="divide-y-2 divide-white divide-dashed">
              <div className="m-auto ml-5 mr-5 mt-3">
                <div className="mb-2">
                  <p className="text-white text-2xl font-bold font-mono overflow-ellipsis overflow-x-hidden">
                    <CountUp end={40021} separator={","} duration={6} />
                    GB
                  </p>
                  <p className="font-bold font-mono text-gray-80 text-xl">
                    Upload bandwith.
                  </p>
                </div>
              </div>
              <div className="m-auto ml-5 mr-5">
                <div className="mt-2">
                  <p className="text-white text-2xl font-bold font-mono overflow-ellipsis overflow-x-hidden">
                    <CountUp end={545454} separator={","} duration={6} />
                    GB
                  </p>
                  <p className="font-bold font-mono text-gray-80 text-xl">
                    Download bandwith.
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
