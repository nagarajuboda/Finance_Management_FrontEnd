export const getotpValidation = (name, value) => {
  console.log(name);
  if (name === "email") {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
  }
  return "";
};
