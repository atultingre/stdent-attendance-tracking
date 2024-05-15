"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_services/GlobalApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoaderIcon, PlusIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddNewStudent = ({ refreshData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grades, setGrades] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /**
   * Used to get the Grades
   */
  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then((resp) => {
      setGrades(resp.data);
    });
  };

  /**
   * Used to Add the Student
   */

  const onSubmit = (data) => {
    setLoading(true);
    GlobalApi.CreateNewStudent(data)
      .then((resp) => {
        if (resp.data) {
          reset();
          setLoading(false);
          setOpen(false);
          refreshData();
          toast.success("New Student Added!");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error creating new student: ", error);
      });
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon size={20} />
        Add New Student
      </Button>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>Add New Student</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="py-2">
                  <label>Full Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Ex. Atul Tingre"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="py-2 flex flex-col">
                  <label>Select Grade</label>
                  <select
                    {...register("grade", { required: true })}
                    className="p-3 border rounded "
                  >
                    {grades?.map((item, index) => (
                      <option value={item.grade} key={index}>
                        {item.grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="py-2">
                  <label>Contact Number</label>
                  <Input
                    name="contact"
                    type="number"
                    placeholder="Ex. 8806234568"
                    {...register("contact")}
                  />
                </div>
                <div className="py-2">
                  <label>Address</label>
                  <Input
                    name="address"
                    placeholder="Ex. Nanded"
                    {...register("address")}
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                type="button"
                onClick={() => setOpen(false)}
                variant="ghost"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction type="submit" disabled={loading}>
                {loading ? <LoaderIcon className="animate-spin " /> : "Save"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddNewStudent;
