"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_services/GlobalApi";

const GridSelect = ({ selectedGrade }) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then((resp) => {
      setGrades(resp.data);
    });
  };

  return (
    <div>
      <select
        className="p-2 border rounded "
        onChange={(e) => selectedGrade(e.target.value)}
      >
        {grades?.map((item, index) => (
          <option value={item.grade} key={index}>
            {item.grade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GridSelect;