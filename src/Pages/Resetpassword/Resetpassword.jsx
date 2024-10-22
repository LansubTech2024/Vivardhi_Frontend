import React, { useState } from "react";
import "./Restpassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    if (password === confirmPassword) {
      console.log("Password reset successfully");
      // You might want to redirect to the login page after this
    } else {
      console.error("Passwords do not match");
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-part">
        <h2>Reset Password</h2>
        <p>Enter your new password.</p>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <label>New Password</label><br/>
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="........" 
              className="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br/>
          </div>
          <div className="user-box">
            <label>Confirm Password</label><br/>
            <input 
              type="password" 
              name="confirmPassword" 
              id="confirmPassword" 
              placeholder="........" 
              className="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            /><br/>
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;