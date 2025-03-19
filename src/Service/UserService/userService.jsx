import axios from "axios";
import { apiurl } from "../createAxiosInstance";
const userService = {
  async FcnLogin(obj) {
    const response = await apiurl.post("/Login/login", obj);
    return response;
  },
  async FcnGetOTP(obj) {
    const response = await apiurl.post("/Auth/get-otp", obj);
    return response;
  },
  async FcnVerifyOTP(obj) {
    const response = await apiurl.post("/Auth/verify-otp", obj);
    return response;
  },
  async FcnCreateNewPassword(obj) {
    const response = await apiurl.post("/Auth/update-password", obj);
    return response;
  },
};
export default userService;
