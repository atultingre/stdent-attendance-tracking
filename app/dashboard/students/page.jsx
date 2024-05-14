"use client";
import React, { useEffect, useState } from "react";
import AddNewStudent from "./_components/AddNewStudent";
import GlobalApi from "@/app/_services/GlobalApi";
import StudentListTable from "./_components/StudentListTable";

const Students = () => {
  const [studentList, setStudentList] = useState([]);

  /**
   * Used to get All Students
   */
  const GetAllStudentList = () => {
    GlobalApi.GetAllStudents().then((res) => {
      setStudentList(res.data);
    });
  };
  useEffect(() => {
    GetAllStudentList();
  }, []);

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        <span>Students</span>
        <AddNewStudent refreshData={GetAllStudentList} />
      </h2>
      <StudentListTable
        studentList={studentList}
        refreshData={GetAllStudentList}
      />
    </div>
  );
};

export default Students;
