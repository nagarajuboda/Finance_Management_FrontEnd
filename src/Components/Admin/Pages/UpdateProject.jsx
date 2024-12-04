import { useEffect, useState } from "react";
import axios from "axios";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
export default function UpdateProject() {
  const ProjectID = sessionStorage.getItem("Projectid");
  console.log(ProjectID, "project id");
  const handleEditClose1 = () => {
    navigate("/dashboard/Employees");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
  };
  return <div></div>;
}
