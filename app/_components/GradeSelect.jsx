"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_services/GlobalApi";

const GradeSelect = ({ selectedGrade }) => {
  const [grades, setGrades] = useState();

  useEffect(() => {
    GetAllGradesList();
  }, []);
  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then((resp) => {
      setGrades(resp.data);
    });
  };

  return (
    <div className="">
      <select
        className="p-2 border rounded"
        onChange={(e) => selectedGrade(e.target.value)}
      >
        <option disabled>Select Class</option>
        {grades?.map((item, index) => (
          <>
            <option value={item.grade} key={index}>
              {item.grade}
            </option>
          </>
        ))}
      </select>
    </div>
  );
};

export default GradeSelect;
