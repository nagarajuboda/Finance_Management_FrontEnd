export const AddRoleFormValidation = (name, value) => {
  console.log(name);
  if (name === "RoleName") {
    if (!value) return "Role is required";
  }
  if (name === "Priority") {
    if (!value) return "Priority  is required";
  }
  return "";
};
