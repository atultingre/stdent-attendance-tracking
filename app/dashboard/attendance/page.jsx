"use client";
import React, { useState } from "react";
import GradeSelect from "@/app/_components/GradeSelect";
import MonthSelection from "@/app/_components/MonthSelection";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import moment from "moment";
import AttendanceGrid from "./_components/AttendanceGrid";

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState("5th");
  const [attendanceList, setAttendanceList] = useState([]);

  /**
   * Used to fetch attendance list for given month and grade
   */
  const onSearchHandler = () => {
    const month = moment(selectedMonth).format("MM/YYYY");
    GlobalApi.GetAttendanceList(selectedGrade, month).then((res) => {
      setAttendanceList(res.data);
    });
  };
  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl">Attendance</h2>
      {/* Search option */}
      <div className="flex my-5 items-center gap-4 border rounded-lg shadow-md p-5">
        <div className="flex items-center gap-2">
          <label htmlFor="">Select Month</label>
          <MonthSelection
            onMothSelection={(value) => setSelectedMonth(value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="">Select Grade</label>
          <GradeSelect selectedGrade={(value) => setSelectedGrade(value)} />
        </div>
        <Button onClick={() => onSearchHandler()}>Search</Button>
      </div>
      {/* attendance grid */}
      <AttendanceGrid
        attendanceList={attendanceList}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default Attendance;
