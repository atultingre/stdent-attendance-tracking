"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

const StudentListTable = ({ studentList, refreshData }) => {
  const CustomButtons = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive" size="sm">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteRecord(props.data.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true, width: 100 },
    { field: "name", filter: true, width: 250 },
    { field: "grade", filter: true, width: 120 },
    { field: "contact", filter: true, width: 150 },
    { field: "address", filter: true, width: 350 },
    { field: "action", cellRenderer: CustomButtons, width: 80 },
  ]);

  useEffect(() => {
    studentList && setRowData(studentList);
  }, [studentList]);

  /**
   * Used to Delete the Student
   */

  const deleteRecord = (id) => {
    GlobalApi.DeleteStudentRecord(id).then((res) => {
      if (res) {
        toast.success("Record deleted successfully !");
        refreshData();
      }
    });
  };
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
