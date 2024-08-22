// import { Link } from "react-router-dom";
// import logo from "../../../assets/Images/1.jpg";
// import "../../../assets/Styles/Profile.css";
// import { useState, useEffect } from "react";

// export default function Profile() {
//   const userDetails = JSON.parse(localStorage.getItem("sessionData"));
//   const [loginUser, setLoginUser] = useState({});
//   console.log(loginUser, "================>");
//   useEffect(() => {
//     setLoginUser(userDetails.employee);
//   }, []);

//   return (
//     <div className="profile-container">
//       <div className="profile-card card shadow-sm p-4">
//         <div className="row align-items-center">
//           <div className="col-md-3 text-center">
//             <img
//               src={logo}
//               alt="Profile"
//               className="profile-image img-fluid rounded-circle mb-3"
//             />
//             <button className="btn btn-outline-primary btn-sm">
//               Change Image
//             </button>
//           </div>
//           <div className="col-md-7">
//             <h4 className="mb-2">{`${loginUser.firstName} ${loginUser.lastName}`}</h4>
//             <p className="text-muted mb-1">
//               Designation: {loginUser.designation || "N/A"}
//             </p>
//             <p className="text-muted">Employee ID: {loginUser.employeeId}</p>
//           </div>
//           <div className="col-md-2 text-md-end">
//             <Link to="/edit-profile" className="btn btn-primary btn-sm">
//               Edit Profile
//             </Link>
//           </div>
//         </div>

//         <hr className="my-4" />

//         <div className="profile-details">
//           <h5>Personal Details</h5>
//           <div className="row mb-2">
//             <div className="col-sm-4">
//               <strong>Email ID:</strong>
//             </div>
//             <div className="col-sm-8">
//               <span>{loginUser.email}</span>
//             </div>
//           </div>
//           <div className="row mb-2">
//             <div className="col-sm-4">
//               <strong>Joining Date:</strong>
//             </div>
//             <div className="col-sm-8">
//               <span>{loginUser.dateOfJoining}</span>
//             </div>
//           </div>
//           <div className="row mb-2">
//             <div className="col-sm-4">
//               <strong>Mobile No:</strong>
//             </div>
//             <div className="col-sm-8">
//               <span>{loginUser.mobileNo}</span>
//             </div>
//           </div>
//           <div className="row mb-2">
//             <div className="col-sm-4">
//               <strong>Skills:</strong>
//             </div>
//             <div className="col-sm-8">
//               <span>{loginUser.skillSets}</span>
//             </div>
//           </div>
//           <div className="row mb-2">
//             <div className="col-sm-4">
//               <strong>Manager:</strong>
//             </div>
//             <div className="col-sm-8">
//               <span>{loginUser.projectManagerId || "N/A"}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import logo from "../../../assets/Images/1.jpg";
import "../../../assets/Styles/Profile.css";
import { useState, useEffect } from "react";

export default function Profile() {
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));
  const [loginUser, setLoginUser] = useState({});
  console.log(loginUser, "================>");
  useEffect(() => {
    setLoginUser(userDetails.employee);
  }, []);

  return (
    <div className="profile-container">
      <div
        className="profile-card card shadow-sm p-4"
        style={{ borderRadius: "0px" }}
      >
        <div className="row align-items-center">
          <div className="col-md-3 text-center d-flex flex-column align-items-center">
            <img
              src={logo}
              alt="Profile"
              className="profile-image img-fluid rounded-circle mb-3"
            />
            <button className="btn btn-outline-primary btn-sm">
              Change Image
            </button>
          </div>
          <div className="col-md-7">
            <h4 className="mb-2">{`${loginUser.firstName} ${loginUser.lastName}`}</h4>
            <p className="text-muted mb-1">
              Designation: {loginUser.designation || "N/A"}
            </p>
            <p className="text-muted">Employee ID: {loginUser.employeeId}</p>
          </div>
          <div className="col-md-2 text-md-end">
            <Link to="/edit-profile" className="btn btn-primary btn-sm">
              Edit Profile
            </Link>
          </div>
        </div>

        <hr className="my-4" />

        <div className="profile-details">
          <h5>Personal Details</h5>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Email ID:</strong>
            </div>
            <div className="col-sm-8">
              <span>{loginUser.email}</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Joining Date:</strong>
            </div>
            <div className="col-sm-8">
              <span>{loginUser.dateOfJoining}</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Mobile No:</strong>
            </div>
            <div className="col-sm-8">
              <span>{loginUser.mobileNo}</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Skills:</strong>
            </div>
            <div className="col-sm-8">
              <span>{loginUser.skillSets}</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Manager:</strong>
            </div>
            <div className="col-sm-8">
              <span>{loginUser.projectManagerId || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
