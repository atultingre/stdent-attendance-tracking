"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

const StudentListTable = ({ studentList }) => {
  const CustomButtons = (props) => {
    return (
      <Button variant="destructive">
        <Trash />
      </Button>
    );
  };

  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "contact", filter: true },
    { field: "address", filter: true },
    { field: "action", cellRenderer: CustomButtons },
  ]);

  useEffect(() => {
    studentList && setRowData(studentList);
  }, [studentList]);

  return (
    <div className="my-7">
      <div className="ag-theme-quartz mt-5" style={{ height: 400 }}>
        <div className="p-2 rounded-lg shadow-sm flex gap-2 mb-4 items-center border max-w-sm">
          <Search />
          <Input
            type="text"
            placeholder="Searchon Anything..."
            className="outline-none w-full"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          quickFilterText={searchInput}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default StudentListTable;
