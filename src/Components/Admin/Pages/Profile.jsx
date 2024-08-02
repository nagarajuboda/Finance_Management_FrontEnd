import { Link } from "react-router-dom";
import logo from "../../../assets/Images/1.jpg";
import "../../../assets/Styles/Profile.css";

export default function Profile() {
  return (
    <div>
      <div className="card">
        <div className="row">
          <div className="col-4">
            <div className="">
              <img src={logo} alt="" className="image-container" />
              <button className="change-image-button">
                <Link to="/edit-profile" className="changeimage">
                  Change Image
                </Link>
              </button>
            </div>
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
