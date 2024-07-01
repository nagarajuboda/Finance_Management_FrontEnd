export const AddClientValidation = (name, value) => {
  console.log(name);
  if (name === "ClientEmailId") {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
  }
  if (name === "ClientName") {
    if (!value) return "Client name is required";
  }
  if (name === "ClientProfile") {
    if (!value) return "Client profile is required";
  }
  if (name === "ClientLocation") {
    if (!value) return "Client location is required";
  }
  return "";
};
