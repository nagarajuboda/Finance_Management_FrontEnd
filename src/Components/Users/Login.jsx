import styles from "../../assets/Styles/Login.module.css";
import logo from "../../assets/Images/log.png";
export default function Login() {
  return (
    <div className={styles.maindiv}>
      <div className={styles.semiMain}>
        <div>
          <img src={logo} alt="" width="175px" />
        </div>
        <div>
          <h1>Welcome back!</h1>
          <p className={styles.welcomeContent}>
            Please login using your account.
          </p>
        </div>
      </div>
    </div>
  );
}
