export const LoginFormValidation = (name, value) => {
  console.log(name);
  if (name === "email") {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
  }
  if (name === "password") {
    if (!value) return "Password name is required";
  }
  return "";
};
