"use client";
import { getUniqueRecord } from "@/app/_services/service";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";

const StatusList = ({ attendanceList }) => {
  //Todo: total percentage = (attendance list length / (No. of students * No of days)*100)
  const [totalStudent, setTotalStudent] = useState(0);
  const [presentPercentage, setPresentPercentage] = useState(0);

  useEffect(() => {
    if (attendanceList) {
      const totalStud = getUniqueRecord(attendanceList);
      setTotalStudent(Number(totalStud.length));

      const today = moment().format("d");
      const PresentPercentage =
        (attendanceList.length / (totalStud.length * Number(today))) * 100;
      setPresentPercentage(Number(PresentPercentage));
    }
  }, [attendanceList]);

  const cards = [
    {
      icon: <GraduationCap />,
      title: "Total Students",
      value: totalStudent,
    },
    {
      icon: <GraduationCap />,
      title: "Total Students",
      value: presentPercentage.toFixed(1) + "%",
    },
    {
      icon: <GraduationCap />,
      title: "Total Students",
      value: (100 - presentPercentage).toFixed(1) + "%",
    },
  ];

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  my-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.value}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusList;
