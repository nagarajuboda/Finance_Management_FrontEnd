export const AddProjectFormValidation = (name, value, values) => {
  if (name === "ProjectID") {
    if (!value) return "Project ID is required";
  }
  if (name === "ProjectName") {
    if (!value) return "Project name is required";
  }
  if (name === "StartDate") {
    if (!value) return "Start Date is required";
  }
  if (name === "EndDate") {
    if (!value) return "Deadline Date is required";

    if (
      new Date(value) < new Date(values.StartDate) ||
      new Date(value) < new Date(values.StartDate)
    ) {
      return "Deadline Date cannot be earlier than Start Date";
    }
  }

  if (name === "ClientEmail") {
    if (!value) return "Please select client";
  }
  if (name === "currencyType") {
    if (!value) return "Please select currency";
  }
  if (name === "ProjectType") {
    if (!value) return "ProjectType is required";
  }
  if (name === "ProjectManager") {
    if (!value) return "Please select ProjectManager";
  }
  if (name === "Department") {
    if (!value) return "Please select Department";
  }
  if (name === "departmentTeam") {
    if (!value) return "Please select Department Team";
  }
  if (name === "Description") {
    if (!value) return "Description is required";
  }
  return "";
};
