"use client";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStateContext } from "@/app/_components/StateContext";

const BarChartComponent = ({}) => {
  const { attendanceList } = useStateContext();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (attendanceList) {
      formatAttendanceListCount();
    }
  }, [attendanceList]);

  const formatAttendanceListCount = () => {
    const totalStudentIds = new Set(
      attendanceList.map((record) => record.studentId)
    );
    const totalStudentCount = totalStudentIds.size;

    const attendanceByDay = {};

    attendanceList.forEach((record) => {
      if (record.day !== null && record.day !== undefined) {
        if (!attendanceByDay[record.day]) {
          attendanceByDay[record.day] = { presentCount: 0, absentCount: 0 };
        }
        if (record.present) {
          attendanceByDay[record.day].presentCount += 1;
        }
      }
    });

    Object.keys(attendanceByDay).forEach((day) => {
      attendanceByDay[day].absentCount =
        totalStudentCount - attendanceByDay[day].presentCount;
    });

    const formattedData = Object.keys(attendanceByDay).map((day) => ({
      day: Number(day),
      ...attendanceByDay[day],
    }));

    setData(formattedData);
  };
  return (
    <div className="border p-5 rounded-lg shadow-sm">
      <h2 className="font-bold text-lg my-2">Attendance</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" name="Day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="presentCount" name="Total Present" fill="#8884d8" />
          <Bar dataKey="absentCount" name="Total Absent" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
