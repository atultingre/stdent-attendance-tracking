"use client";
import React, { useEffect } from "react";
import moment from "moment";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import Card from "./Card";
import { useStateContext } from "@/app/_components/StateContext";
import { getUniqueRecord } from "@/app/_services/service";

const StatusList = () => {
  const {
    attendanceList,
    loading,
    setLoading,
    totalStudent,
    setTotalStudent,
    presentPercentage,
    setPresentPercentage,
    absentPercentage,
    setAbsentPercentage,
  } = useStateContext();

  const getStudentUniqueRecord = (list) => {
    const uniqueIds = [...new Set(list.map((item) => item.studentId))];
    return list.filter((item) => uniqueIds.includes(item.studentId));
  };

  useEffect(() => {
    if (attendanceList) {
      setLoading(true);
      const totalStudentInClass = getUniqueRecord(attendanceList);

      setTotalStudent(totalStudentInClass.length);

      // Calculate total unique students
      const totalStud = getStudentUniqueRecord(
        attendanceList.filter((item) => item.studentId)
      );
      console.log("totalStud: ", totalStud);

      // Get the number of days in the current month
      const totalDays = moment().daysInMonth();

      // Calculate the number of days attended by all students
      const daysAttended = attendanceList.filter(
        (item) => item.present === true
      ).length;
      console.log("daysAttended: ", daysAttended);

      // Calculate the present and absent percentages
      const totalAttendanceSlots = totalStudent * totalDays;
      const presentPercentage = (daysAttended / totalAttendanceSlots) * 100;

      setPresentPercentage(
        Number.isNaN(presentPercentage) ? 0 : presentPercentage
      );
      setAbsentPercentage(
        Number(totalStudentInClass.length) ? 100 - presentPercentage : 0
      );
      setLoading(false);
    }
  }, [attendanceList, presentPercentage, absentPercentage]);

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  my-6">
        {loading ? (
          <>
            {[1, 2, 4].map((item, index) => (
              <div className="flex items-center gap-5 animate-pulse w-full bg-slate-300 rounded-lg shadow-sm  h-32"></div>
            ))}
          </>
        ) : (
          <>
            <Card
              icon={<GraduationCap />}
              title="Total Students"
              value={totalStudent}
            />
            <Card
              icon={<TrendingUp />}
              title="Present Total % "
              value={presentPercentage.toFixed(1) + "%"}
            />
            <Card
              icon={<TrendingDown />}
              title="Absent Total  % "
              value={absentPercentage.toFixed(1) + "%"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default StatusList;
