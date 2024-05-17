"use client";
import React, { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useStateContext } from "@/app/_components/StateContext";

const PieChartComponent = () => {
  const { presentPercentage, absentPercentage } = useStateContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        name: "Total Present %",
        value: Number(presentPercentage.toFixed(1)),
        fill: "#4c8cf8",
      },
      {
        name: "Total Absent %",
        value: Number(absentPercentage.toFixed(1)),
        fill: "#1fe6d1",
      },
    ]);
  }, [presentPercentage, absentPercentage]);

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Monthly Attendance</h2>
      <ResponsiveContainer width={"100%"} height={315}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
