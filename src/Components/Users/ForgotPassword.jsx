import forgotpasswordsideImaage from "../../assets/Images/forgotpasswordimage.png";
import "../../assets/Styles/ForgotPassword.css";
import archetslogo from "../../../src/assets/Images/primary-logo.png";
import { useNavigate } from "react-router-dom";
import { getotpValidation } from "./getotpValidation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
export default function ForgotPassword() {
  const [emailvalues, setEmialValuess] = useState({
    email: "",
  });
  const [emailerror, setEmialerror] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const backtoLogin = async () => {
    navigate("/");
  };
  const handleChange22 = async (e) => {
    const { name, value } = e.target;

    setEmialValuess({
      ...emailvalues,
      [name]: value,
    });

    setEmialerror({
      ...emailerror,
      [name]: getotpValidation(name, value),
    });
  };
  async function getotpfunction(e) {
    e.preventDefault();
    const newErrors = {
      email: getotpValidation("email", emailvalues.email),
    };
    setEmialerror(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === "");
    if (isValid) {
      var obj = {
        Email: emailvalues.email,
      };

      var responses = await axios.post(
        "https://localhost:44305/api/Auth/get-otp",
        obj
      );
      var result = await responses.data;
      if (result.isSuccess) {
        localStorage.setItem("Email", emailvalues.email);
        localStorage.setItem("OTP", result.item.otp);
        toast.success("OTP sent successfully to Your Email.", {
          position: "top-right",
          autoClose: 1000,
          onClose: () => navigate("/user/VerifyOtp"),
        });
      } else {
        toast.error("Please enter a valid email.", {
          position: "top-right",
          autoClose: 4000,
        });
      }
    }
  }
  return (
    <div
      className="fogotpasswordpagemaindiv "
      style={{ height: "100vh", display: "flex" }}
    >
      <div className="" style={{ width: "50%" }}>
        <img
          src={forgotpasswordsideImaage}
          alt=""
          className="forgotpasswordImage"
        />
      </div>
      <div
        className="formdiv3"
        style={{ backgroundColor: "#FAFFFB", width: "50%" }}
      >
        <div className="formdiv2">
          <div className="" style={{ margin: "80px" }}>
            <img src={archetslogo} alt="" />
          </div>
          <div style={{ marginLeft: "80px " }}>
            <div
              className="forgotpasswordcontent"
              style={{ marginTop: " 60px " }}
            >
              Forgot your password?
            </div>
            <div className="enetremailid">
              Enter your email id, we will reset your passward.
            </div>
            <form onSubmit={getotpfunction}>
              <div className="forgotform">
                <div className="mb-1">
                  <label className="inputlable">Email ID</label>
                </div>
                <input
                  type="text"
                  placeholder="enter your email "
                  className="emailinput form-control"
                  onChange={handleChange22}
                  name="email"
                  value={emailvalues.email}
                />
                <div className="backtologin mt-2">
                  <div>
                    {emailerror.email && (
                      <span className=" ms-1 emailrequirederrormessage">
                        {emailerror.email}
                      </span>
                    )}
                  </div>

                  <a
                    style={{ color: "#0071FF", cursor: "pointer" }}
                    onClick={backtoLogin}
                    className="me-4"
                  >
                    Back to login
                  </a>
                </div>

                <div className="loginbutton">
                  <button className="buttonlogin">Submit</button>
                </div>
                <div className="forcontect1">
                  if you are a new user, please contact archents support team.
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
