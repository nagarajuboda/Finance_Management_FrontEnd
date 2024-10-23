import "../../assets/Styles/AddEmployee.css";
import { TextField } from "@mui/material";
import { useState } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import pulsimage from "../../assets/Images/plus.png";
export default function AddEmployee() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="addemployeemaindiv">
      <div className="addemployeecontent">Add employee model</div>
      <div className="employeeformdiv">
        <form>
          <div className="row  m-0">
            <div className="col-3">
              <TextField
                style={{ border: "#DCDCDC" }}
                id="outlined-basic"
                label="Email ID"
                variant="outlined"
                placeholder="IARCXXXX"
                InputLabelProps={{
                  className: "custom-label",
                }}
                InputProps={{
                  sx: {
                    width: "291px",
                    "& input::placeholder": {
                      fontSize: "12px",
                      opacity: 1,
                      height: "16px",
                      textAlign: "left",
                      fontWeight: "600",
                      lineHeight: "12px",
                      color: "#AEAEAE",
                    },
                  },
                }}
              />
            </div>
            <div className="col-3">
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                placeholder="Loreum ipsum"
                InputLabelProps={{
                  // className: "custom-label",
                  sx: {
                    marginTop: "-5px",
                    textAlign: "left",
                    width: "64px",
                    fontFamily: "Segoe UI",
                    fontWeight: 600,
                    fontStyle: "normal",
                    fontSize: "12px",
                    lineHeight: "20px",
                    letterSpacing: "0px",
                    color: "#000000",
                    opacity: 1,
                  },
                }}
                InputProps={{
                  sx: {
                    height: "36px",
                    width: "291px",
                    "& input::placeholder": {
                      fontSize: "12px",
                      opacity: 1,
                      height: "16px",
                      textAlign: "left",
                      fontWeight: "600",
                      lineHeight: "12px",
                      color: "#AEAEAE",
                    },
                  },
                }}
              />
            </div>
            <div className="col-3">
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                placeholder="Loreum ipsum"
                InputLabelProps={{
                  className: "custom-label",
                }}
                InputProps={{
                  sx: {
                    height: "36px",
                    width: "291px",
                    "& input::placeholder": {
                      fontSize: "12px",
                      opacity: 1,
                      height: "16px",
                      textAlign: "left",
                      fontWeight: "600",
                      lineHeight: "12px",
                      color: "#AEAEAE",
                    },
                  },
                }}
              />
            </div>
            <div className="col-3">
              <TextField
                id="outlined-basic"
                label="Email ID"
                variant="outlined"
                placeholder="yourname.surname@archents.com"
                InputLabelProps={{
                  className: "custom-label",
                }}
                InputProps={{
                  sx: {
                    height: "36px",
                    width: "291px",
                    "& input::placeholder": {
                      fontSize: "12px",
                      opacity: 1,
                      height: "16px",
                      textAlign: "left",
                      fontWeight: "600",
                      lineHeight: "12px",
                      color: "#AEAEAE",
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="row  m-0" style={{ paddingTop: "58px" }}>
            <div className="col-3">
              <TextField
                id="outlined-basic"
                label="Mobile Number"
                variant="outlined"
                placeholder="+91 XXXXXXXXXX"
                InputLabelProps={{
                  className: "custom-label",
                }}
                InputProps={{
                  sx: {
                    height: "36px",
                    width: "291px",
                    "& input::placeholder": {
                      fontSize: "12px",
                      opacity: 1,
                      height: "16px",
                      textAlign: "left",
                      fontWeight: "600",
                      lineHeight: "12px",
                      color: "#AEAEAE",
                    },
                  },
                }}
              />
            </div>
            <div className="col-3">
              <TextField
                id="outlined-basic"
                label="Date of Joining"
                variant="outlined"
                placeholder="DD/MM/YYYY"
                InputLabelProps={{
                  className: "custom-label",
                }}
                InputProps={{
                  sx: {
                    height: "36px",
                    width: "291px",
                    "& input::placeholder": {
                      fontSize: "12px",
                      opacity: 1,
                      height: "16px",
                      textAlign: "left",
                      fontWeight: "600",
                      lineHeight: "12px",
                      color: "#AEAEAE",
                    },
                  },
                }}
              />
            </div>
            <div className="col-3">
              {/* <FormControl variant="outlined" sx={{ minWidth: 291 }}>
                <InputLabel id="custom-dropdown-label">Role</InputLabel>
                <Select
                  labelId="custom-dropdown-label"
                  id="custom-dropdown"
                  value={selectedOption}
                  onChange={handleChange}
                  label="Select Option"
                  placeholder="Select"
                  sx={{
                    height: "36px",
                    "& .MuiSelect-select": {
                      padding: "8px",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Role Select </em>
                  </MenuItem>
                  <MenuItem value={10}>Option 1</MenuItem>
                  <MenuItem value={20}>Option 2</MenuItem>
                  <MenuItem value={30}>Option 3</MenuItem>
                </Select>
              </FormControl> */}
              <FormControl variant="outlined" sx={{ minWidth: 291 }}>
                <InputLabel id="custom-dropdown-label">Role</InputLabel>
                <Select
                  labelId="custom-dropdown-label"
                  id="custom-dropdown"
                  value={selectedOption || ""}
                  onChange={handleChange}
                  label="Select Option"
                  sx={{
                    height: "36px",
                    "& .MuiSelect-select": {
                      padding: "8px",
                      fontSize: "14px",
                      color: selectedOption ? "#000" : "#AEAEAE", // Placeholder color when nothing is selected
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select Role</em> {/* Correctly styled placeholder */}
                  </MenuItem>
                  <MenuItem value={10}>Option 1</MenuItem>
                  <MenuItem value={20}>Option 2</MenuItem>
                  <MenuItem value={30}>Option 3</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-3">
              <FormControl variant="outlined" sx={{ minWidth: 291 }}>
                <InputLabel id="custom-dropdown-label">
                  Reporting Manager
                </InputLabel>
                <Select
                  labelId="custom-dropdown-label"
                  id="custom-dropdown"
                  value={selectedOption}
                  onChange={handleChange}
                  label="Select Option"
                  sx={{
                    height: "36px",
                    "& .MuiSelect-select": {
                      padding: "8px",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select </em>
                  </MenuItem>
                  <MenuItem value={10}>Option 1</MenuItem>
                  <MenuItem value={20}>Option 2</MenuItem>
                  <MenuItem value={30}>Option 3</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="row m-0" style={{ paddingTop: "58px" }}>
            <div
              className="col-3"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <TextField
                  id="outlined-basic"
                  label="Add Skills"
                  variant="outlined"
                  placeholder="Add Skills"
                  InputLabelProps={{
                    className: "custom-label",
                  }}
                  InputProps={{
                    sx: {
                      height: "36px",
                      width: "250px",
                      "& input::placeholder": {
                        fontSize: "12px",
                        opacity: 1,
                        height: "16px",
                        textAlign: "left",
                        fontWeight: "600",
                        lineHeight: "12px",
                        color: "#AEAEAE",
                      },
                    },
                  }}
                />
              </div>
              <div className="" style={{ marginRight: "39px" }}>
                <img src={pulsimage} alt="" width="35px" height="36px" />
              </div>
            </div>
            <div className="col-3"></div>
            <div className="col-3"></div>
            <div className="col-3"></div>
          </div>

          <div
            className="row m-0"
            style={{
              paddingTop: "58px",
              paddingLeft: "10px",
              paddingRight: "45px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Add Skills"
              variant="outlined"
              placeholder="Add Skills"
              multiline
              rows={4}
              InputLabelProps={{
                className: "custom-label",
              }}
              InputProps={{
                sx: {
                  height: "85px",

                  "& input::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                    backgroundColor: "#FFFFFF",
                    backgroundPosition: "0% 0%",
                    backgroundRepeat: "no-repeat",
                    border: " 1px solid #DCDCDC",
                    borderRadius: "5px",
                  },
                  "& textarea::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                  },
                },
              }}
            />
          </div>
          <div className="row m-0">
            <div className="col-10"></div>
            <div className="col-2">
              <button className="btn btn-success">Submit</button>
              <button className="btn btn-primary">reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
