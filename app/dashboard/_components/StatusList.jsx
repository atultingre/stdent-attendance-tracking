"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import Card from "./Card";
import { getUniqueRecord } from "@/app/_services/service";

const StatusList = ({ attendanceList }) => {
  //formula for getting total percentage: total percentage = (attendance list length / (No. of students * No of days)*100)
  const [totalStudent, setTotalStudent] = useState(0);
  const [presentPercentage, setPresentPercentage] = useState(0);
  const [absentPercentage, setAbsentPercentage] = useState(0);

  useEffect(() => {
    if (attendanceList && attendanceList.length > 0) {
      const totalStud = getUniqueRecord(attendanceList);
      setTotalStudent(totalStud.length);

      const totalDays = moment().format('D'); 

      const presentPercentage =
      (attendanceList.length / (totalStud.length * totalDays)) * 100;

      setPresentPercentage(
        Number.isNaN(presentPercentage) ? 0 : presentPercentage
      );
      setAbsentPercentage(100 - presentPercentage);
    }
  }, [attendanceList]);

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  my-6">
        <Card
          icon={<GraduationCap />}
          title="Total Students"
          value={totalStudent}
        />
        <Card
          icon={<TrendingUp />}
          title="Total % Present"
          value={presentPercentage.toFixed(1) + "%"}
        />
        <Card
          icon={<TrendingDown />}
          title="Total  % Absent"
          value={absentPercentage.toFixed(1) + "%"}
        />
      </div>
    </div>
  );
};

export default StatusList;
