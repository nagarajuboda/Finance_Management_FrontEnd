import { Link } from "react-router-dom";
import logo from "../../../assets/Images/1.jpg";
import "../../../assets/Styles/Profile.css";

export default function Profile() {
  return (
    <div>
      <div className="card" style={{ borderRadius: "0px" }}>
        <div className="row">
          <div className="col-4">
            <div className="">
              <img
                src={logo}
                alt=""
                className=""
                width="100px"
                height="100px"
              />
            </div>
            <button className="changeimagebtn ms-5">Change image</button>
          </div>
          <div className="col-6"></div>
          <div className="col-2">
            <Link to="/edit-profile">Edit Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
