import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../../assets/Styles/Login.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('login'); // 'login', 'resetPassword', 'verifyOtp', 'setNewPassword'
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const onLoginButtonClick = async (data) => {
    console.log("Login Button clicked");
    try {
      var obj = {
        Email: data.email,
        Password: data.password
      };
      var responses = await axios.post("https://localhost:44305/api/Login/login", obj);
      var result = await responses.data;
      console.log(responses, "response");
      console.log(result, "result");
      setLoggedIn(true); // Update logged-in state
      if (result.isSuccess) {
        toast.success("Successfully Logged in.", { position: "top-right", autoClose: 4000 });
        setLoggedIn(true); // Update logged-in state
        navigate(''); // Navigate to dashboard or another page
      } else {
        toast.error("Please check your credentials.", { position: "top-right", autoClose: 4000 });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed. Please try again.", { position: "top-right", autoClose: 4000 });
      // Handle error state or display error message to the user
    }
  }

  async function onGetOtpClick(e) {
    e.preventDefault();
    console.log("Get OTP Button clicked");
    var obj = { email };
    try {
      var responses=await axios.post("https://localhost:44305/api/Auth/get-otp", obj);
      var result = await responses.data;
      console.log(responses, "response");
      console.log(result, "result");
     if (result.isSuccess)
      {
        toast.success("OTP sent successfully.", { position: "top-right", autoClose: 4000 });
        setView('verifyOtp');
      } 
      else
      {
        toast.error("Please enter a valid email.", { position: "top-right", autoClose: 4000 });
      }
     
    } catch (error) {
      console.error("Error getting OTP:", error);
      toast.error("Failed to get OTP. Please try again.", { position: "top-right", autoClose: 4000 });
    }
  }

  async function onVerifyOtpClick(e) {
    e.preventDefault();
    console.log("Verify OTP Button clicked");
    var obj = { email, otp };
    try {
      var responses = await axios.post("https://localhost:44305/api/Auth/verify-otp", obj);
      var result = await responses.data;
      console.log(responses, "response");
      console.log(result, "result");
      if (result.isSuccess) {
        toast.success("OTP verified successfully.", { position: "top-right", autoClose: 4000 });
        setView('setNewPassword');
      } else {
        toast.error("Invalid OTP. Please try again.", { position: "top-right", autoClose: 4000 });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.", { position: "top-right", autoClose: 4000 });
    }
  }

  async function onSetNewPasswordClick(e) {
    e.preventDefault();
    console.log("Set New Password Button clicked");
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", { position: "top-right", autoClose: 4000 });
      return;
    }
    var obj = { email, otp, newPassword };
    try {
      var responses=await axios.post("https://localhost:44305/api/Auth/update-password", obj);
      var result=responses.data;
      console.log(responses, "response");
      console.log(result, "result");
      if(result.isSuccess)
        {
          toast.success("Password updated successfully.", { position: "top-right", autoClose: 4000 });
          setView('login');
        }
      else
      {
        toast.error("Failed to update password.", { position: "top-right", autoClose: 4000 });
      }
    
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password. Please try again.", { position: "top-right", autoClose: 4000 });
    }
  }

  const renderLoginForm = () => (
    <div className="loginForm">
      <form onSubmit={handleSubmit(onLoginButtonClick)}>
        <input
          type="text"
          placeholder="Email Address"
          className="inputField"
          {...register('email', { required: 'Email is required' })}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="validationError">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          className="inputField"
          {...register('password', { required: 'Password is required' })}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="validationError">{errors.password.message}</p>}

        <button className="loginButton">Login</button>
      </form>
      <div className="forgotResetContainer">
        <div className="forgotPassword">Forgot your password?</div>
        <div className="resetLink" onClick={() => setView('resetPassword')}>Reset Here</div>
      </div>
    </div>
  );

  const renderResetPasswordForm = () => (
    <div className="resetPasswordForm">
      <input
        type="text"
        placeholder="Email Address"
        className="inputField"
        {...register('email', { required: 'Email is required' })}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="validationError">{errors.email.message}</p>}

      <button className="loginButton" onClick={onGetOtpClick}>Get OTP</button>
      <div className="backToLogin" onClick={() => setView('login')}>Back to Login</div>
    </div>
  );

  const renderVerifyOtpForm = () => (
    <div className="verifyOtpForm">
      <input
        type="text"
        placeholder="Enter OTP"
        className="inputField"
        {...register('otp', { required: 'OTP is required' })}
        onChange={(e) => setOtp(e.target.value)}
      />
      {errors.otp && <p className="validationError">{errors.otp.message}</p>}

      <button className="loginButton" onClick={onVerifyOtpClick}>Verify OTP</button>
      <div className="backToLogin" onClick={() => setView('login')}>Back to Login</div>
    </div>
  );

  const renderSetNewPasswordForm = () => (
    <div className="setNewPasswordForm">
      <input
        type="password"
        placeholder="New Password"
        className="inputField"
        {...register('newPassword', { required: 'New password is required' })}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      {errors.newPassword && <p className="validationError">{errors.newPassword.message}</p>}

      <input
        type="password"
        placeholder="Confirm Password"
        className="inputField"
        {...register('confirmPassword', { required: 'Confirm password is required' })}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errors.confirmPassword && <p className="validationError">{errors.confirmPassword.message}</p>}

      <button className="loginButton" onClick={onSetNewPasswordClick}>Set New Password</button>
      <div className="backToLogin" onClick={() => setView('login')}>Back to Login</div>
    </div>
  );

  return (
    <div className="mainContainer">
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {/* Toast Container for displaying messages */}
      <ToastContainer />

      {/* Logo */}
      <img src="src/assets/Images/ArchentsLogo.png" alt="Logo" className="logo" />

      {view === 'login' && (
        <div className="welcomeMessage">
          <div id='welcome'>Welcome back!</div>
          <div className="Text">Please login using your account.</div>
        </div>
      )}

      {/* Conditional rendering based on view state */}
      {view === 'login' && renderLoginForm()}
      {view === 'resetPassword' && renderResetPasswordForm()}
      {view === 'verifyOtp' && renderVerifyOtpForm()}
      {view === 'setNewPassword' && renderSetNewPasswordForm()}

      {/* Conditional rendering based on login status */}
      {loggedIn ? <div></div> : <div />}
    </div>
  );
};

export default Home;
