"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import moment from "moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

const AttendanceGrid = ({ attendanceList, selectedMonth }) => {
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState([
    { field: "studentId", filter: true },
    { field: "name", filter: true },
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

      setColDefs((prevData) => [...prevData.slice(0, 2), ...dynamicCols]);

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

  /**
   * used to check if user is present or not
   * @param {*} studentId
   * @param {*} day
   * @returns
   */

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

  /**
   * used to mark student attendance
   * @param {*} day
   * @param {*} studentId
   * @param {*} presentStatus
   */
  const onMarkAttendance = (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format("MM/YYYY");
    if (presentStatus) {
      const data = {
        day: day,
        studentId: studentId,
        present: presentStatus,
        date: date,
      };

      GlobalApi.MarkAttendance(data).then((res) => {
        console.log(res);
        toast.success("Student id:" + studentId + " Mark as present");
      });
    } else {
      GlobalApi.MarkAttendanceAsAbsent(studentId, day, date).then((res) => {
        console.log("res: ", res);
        toast.success("Student id:" + studentId + " Mark as absent");
      });
    }
  };

  return (
    <div>
      <div className="ag-theme-quartz" style={{ height: 400 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e) =>
            onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)
          }
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default AttendanceGrid;
