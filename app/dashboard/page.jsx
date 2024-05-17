"use client";
import React, { useEffect, useState } from "react";
import MonthSelection from "../_components/MonthSelection";
import GradeSelect from "../_components/GradeSelect";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";
import BarChartComponent from "./_components/BarChartComponent";
import PieChartComponent from "./_components/PieChartComponent";
import { useStateContext } from "../_components/StateContext";

const dashboard = () => {

  const { setAttendanceList } = useStateContext();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState("1st");

  useEffect(() => {
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



  return (
    <div className="p-7">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>

        <div className="flex items-center gap-4">
          <MonthSelection onMothSelection={setSelectedMonth} />
          <GradeSelect selectedGrade={setSelectedGrade} />
        </div>
      </div>
      <StatusList />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 ">
          <BarChartComponent />
        </div>
        <div>
          <PieChartComponent />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
