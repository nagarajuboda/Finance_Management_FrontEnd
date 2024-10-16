export const getotpValidation = (name, value) => {
  console.log(name);
  if (name === "email") {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value))
      return "Entered email id is wrong. Please try again";
  }
  return "";
};
