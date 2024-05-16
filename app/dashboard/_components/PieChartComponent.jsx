"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getUniqueRecord } from "@/app/_services/service";

const PieChartComponent = ({ attendanceList }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (attendanceList) {
      const totalStud = getUniqueRecord(attendanceList);

      const totalPresent = attendanceList.filter(
        (record) => record.present
      ).length;

      const today = moment().format("D");

      const presentPercentage =
        (attendanceList.length / (totalStud.length * today)) * 100;
      setData([
        {
          name: "Total Present",
          value: Number(presentPercentage.toFixed(1)),
          fill: "#4c8cf8",
        },
        {
          name: "Total Absent",
          value: 100 - Number(presentPercentage.toFixed(1)),
          fill: "#1fe6d1",
        },
      ]);
    }
  }, [attendanceList]);

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Monthly Attendance</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart width={730} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
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
