"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import MonthSelection from "../_components/MonthSelection";
import GradeSelect from "../_components/GradeSelect";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";

const dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState("5th");
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    getStudentAttendance();
  }, [selectedMonth || selectedGrade]);

  /**
   * used to get the students attendance
   */

  const getStudentAttendance = () => {
    GlobalApi.GetAttendanceList(
      selectedGrade,
      moment(selectedMonth).format("MM/YYYY")
    ).then((res) => {
      setAttendanceList(res.data);
    });
  };

  return (
    <div className="p-7">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>

        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelect selectedGrade={setSelectedGrade} />
        </div>
      </div>
      <div>
        <div>
          <StatusList attendanceList={attendanceList} />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
