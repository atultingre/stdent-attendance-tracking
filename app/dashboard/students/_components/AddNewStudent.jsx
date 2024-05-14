"use client";
import React, { useEffect, useState } from "react";
import { LoaderIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";

const AddNewStudent = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grades, setGrades] = useState([]);
  console.log("grades: ", grades);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /**
   * Used to get the Grades
   */

  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then((resp) => {
      console.log("resp: ", resp);
      setGrades(resp.data);
    });
  };

  useEffect(() => {
    GetAllGradesList();
  }, []);

  /**
   * Used to Add the Student
   */

  const onSubmit = (data) => {
    setLoading(true);
    GlobalApi.CreateNewStudent(data)
      .then((resp) => {
        console.log(resp);
        if (resp.data) {
          reset();
          setLoading(false);
          setOpen(false);
          toast("New Student Added!");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error creating new student: ", error); // Log any errors
      });
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon size={20} />
        Add New Student
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
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
                    {/* {grades?.map((item, index) => (
                      <option value={item.grade} key={index}>
                        {item.grade}
                      </option>
                    ))} */}
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
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
                <div className="flex py-2 justify-end gap-3">
                  <Button
                    type="button"
                    onClick={() => setOpen(false)}
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disable={loading}>
                    {loading ? (
                      <LoaderIcon className="animate-spin " />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStudent;
