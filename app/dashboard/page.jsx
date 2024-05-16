"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import MonthSelection from "../_components/MonthSelection";
import GradeSelect from "../_components/GradeSelect";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";
import BarChartComponent from "./_components/BarChartComponent";
import PieChartComponent from "./_components/PieChartComponent";

const dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState("1st");
  const [attendanceList, setAttendanceList] = useState();
  // const [totalPresentData, settotalPresentData] = useState([]);

  useEffect(() => {
    // GetTotalPresentCountByDay();
    getStudentAttendance();
  }, [selectedMonth || selectedGrade]);

  /**
   * used to get the students attendance
   */

  const getStudentAttendance = () => {
    GlobalApi.GetAttendanceList(
      selectedGrade,
      moment(selectedMonth).format("MM/yyyy")
    ).then((res) => {
      setAttendanceList(res.data);
    });
  };

  // const GetTotalPresentCountByDay = () => {
  //   GlobalApi.TotalPresentCountByDay(
  //     moment(selectedMonth).format("MM/yyyy"),
  //     selectedGrade
  //   ).then((res) => settotalPresentData(res.data));
  // };

  return (
    <div className="p-7">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>

        <div className="flex items-center gap-4">
          <MonthSelection onMothSelection={setSelectedMonth} />
          <GradeSelect selectedGrade={setSelectedGrade} />
        </div>
      </div>
      <StatusList attendanceList={attendanceList} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 ">
          <BarChartComponent
            attendanceList={attendanceList}
            // totalPresentData={totalPresentData}
          />
        </div>
        <div>
          <PieChartComponent attendanceList={attendanceList} />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
