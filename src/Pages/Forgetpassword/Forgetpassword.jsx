
import React, { useState } from "react";
import "./Forgetpassword.css"

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission logic here
    console.log("Email submitted:", email);
    // You might want to redirect to the reset password page after this
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-part">
        <h2>Forget Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <label>Email</label><br/>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Eg:johndoe@gmail.com" 
              className="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br/>
          </div>
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};
export default ForgetPassword;