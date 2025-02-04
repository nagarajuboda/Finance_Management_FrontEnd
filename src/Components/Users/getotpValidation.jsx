export const getotpValidation = (name, value) => {
  if (name === "email") {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value))
      return "Entered email id is wrong. Please try again";
  }
  return "";
};
