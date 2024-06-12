import styles from "../../assets/Styles/Login.module.css";
import logo from "../../assets/Images/ArchentsLogo.png";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div className={styles.maindiv}>
      <div className="row m-0">
        <div className="col-4"></div>
        <div className="col-4">
          <div
            className="card"
            style={{
              margin: "43px 0px",
              borderRadius: "13px",
              padding: "0",
            }}
          >
            <img
              src={logo}
              alt="jfdsk"
              width="175px"
              className={styles.imagess}
            />

            <div className="jfskd">
              <h3 className="text-center">Welcome back!</h3>
              <p
                className="text-center"
                style={{ fontSize: "0.875rem;", marginLeft: "37px" }}
              >
                Please login using your account.
              </p>
            </div>
            <div className={styles.formdiv}>
              <div className={styles.Input}>
                <input
                  type="text"
                  placeholder="Username or Email"
                  className="form-control"
                  style={{ padding: "10px" }}
                />
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  placeholder="Type Password"
                  className="form-control"
                  style={{ padding: "10px" }}
                />
              </div>
              <div className={styles.Input}>
                <button
                  type="submit"
                  className="form-control"
                  style={{
                    backgroundColor: "rgba(146, 74, 239, 1)",
                    color: "white",
                    padding: "13px",
                    fontWeight: "500",
                    fontSize: "17px",
                    borderRadius: "8px",
                  }}
                >
                  Login
                </button>
              </div>
              <div
                className={styles.Input}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <a href="#" className={styles.forgot}>
                  Forgot your password?
                </a>
                <Link to="">Reset Here</Link>
                {/* <a href="#">Reset Here</a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}
