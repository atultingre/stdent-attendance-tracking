"use client";
import React, { createContext, useContext, useState } from "react";

// Create the context
const StateContext = createContext();

// Create a provider component
export const StateProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState("1st");
  const [attendanceList, setAttendanceList] = useState([]);
  const [totalPresentData, setTotalPresentData] = useState([]);
  const [totalStudent, setTotalStudent] = useState(0);
  const [presentPercentage, setPresentPercentage] = useState(0);
  const [absentPercentage, setAbsentPercentage] = useState(0);
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [grades, setGrades] = useState([]);

  return (
    <StateContext.Provider
      value={{
        selectedMonth,
        setSelectedMonth,
        selectedGrade,
        setSelectedGrade,
        attendanceList,
        setAttendanceList,
        totalPresentData,
        setTotalPresentData,
        totalStudent,
        setTotalStudent,
        presentPercentage,
        setPresentPercentage,
        absentPercentage,
        setAbsentPercentage,
        studentList,
        setStudentList,
        loading,
        setLoading,
        grades,
        setGrades,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Create a custom hook to use the context
export const useStateContext = () => useContext(StateContext);
