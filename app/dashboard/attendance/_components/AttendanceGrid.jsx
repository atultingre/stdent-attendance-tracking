"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import moment from "moment";

const AttendanceGrid = ({ attendanceList, selectedMonth }) => {
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState([
    { field: "studentId" },
    { field: "name" },
  ]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  // const numberOfDays = daysInMonth(
  //   moment(selectedMonth).format("YYYY"),
  //   moment(selectedMonth).format("MM")
  // );

  const numberOfDays = useMemo(() => {
    return daysInMonth(
      moment(selectedMonth).format("YYYY"),
      moment(selectedMonth).format("MM") - 1 // months are 0-indexed in JavaScript Date
    );
  }, [selectedMonth]);

  // const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);
  const daysArray = useMemo(() => {
    return Array.from({ length: numberOfDays }, (_, i) => i + 1);
  }, [numberOfDays]);

  useEffect(() => {
    if (attendanceList) {
      const userList = getUniqueRecord();
      setRowData(userList);

      const dynamicCols = daysArray.map((date) => ({
        field: date.toString(),
        width: 50,
        editable: true,
      }));

      setColDefs((prevData) => [
        ...prevData.slice(0, 2),
        ...dynamicCols,
      ]);

      userList.forEach((obj) => {
        daysArray.forEach((date) => {
          obj[date] = isPresent(obj.studentId, date);
        });
      });

      // daysArray.forEach((date) => {
      //   setColDefs((prevData) => [
      //     ...prevData,
      //     { field: date.toString(), width: 50, editable: true },
      //   ]);
      //   userList.forEach((obj) => {
      //     obj[date] = isPresent(obj.studentId, date);
      //   });
      // });
    }
  }, [attendanceList, daysArray]);

  const isPresent = (studentId, day) => {
    const result = attendanceList.find(
      (item) => item.day === day && item.studentId === studentId
    );
    return result ? true : false;
  };

  /**
   * used to get distinct user list
   */
  const getUniqueRecord = () => {
    const uniqueRecord = [];
    const existingUser = new Set();

    attendanceList.forEach((record) => {
      if (!existingUser.has(record.studentId)) {
        existingUser.add(record.studentId);
        uniqueRecord.push(record);
      }
    });

    return uniqueRecord;
  };

  console.log("daysArray: ", daysArray);
  return (
    <div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
};

export default AttendanceGrid;
