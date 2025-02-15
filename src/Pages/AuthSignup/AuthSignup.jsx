import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import {
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineArrowRight,
  AiOutlineHome,
} from "react-icons/ai";
import AxiosService from "../../Components/AuthService/AuthService";
import "./AuthSignup.css"

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const signupSchema = Yup.object().shape({
    companyname: Yup.string()
      .min(2, "Company name must be at least 2 characters")
      .required("Company name is required"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });

  const initialValues = {
    companyname: "",
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const res = await AxiosService.post("signup/", values);

      if (res.status === 201) {
        toast.success("Account created successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
          resetForm();
          window.location.href = "/";
        }, 3000);
      }
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      if (error.response && error.response.status === 409) {
        errorMessage = "Account already exists";
      }
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
      console.log(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="left-panel">
          <h2>WELCOME TO OPFACT</h2>
        </div>
        <div className="right-panel">
          <h3>Sign Up</h3>
          <Formik initialValues={initialValues} validationSchema={signupSchema} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form>
                <label>Company Name</label>
                <div className="input-group">
                  <AiOutlineHome className="input-icon" />
                  <Field type="text" name="companyname" placeholder="Company Name" className={errors.companyname && touched.companyname ? "error" : ""} />
                </div>
                {errors.companyname && touched.companyname && <div className="auth-error-message">{errors.companyname}</div>}

                <label>Username</label>
                <div className="input-group">
                  <AiOutlineUser className="input-icon" />
                  <Field type="text" name="username" placeholder="Username" className={errors.username && touched.username ? "error" : ""} />
                </div>
                {errors.username && touched.username && <div className="auth-error-message">{errors.username}</div>}

                <label>Email address</label>
                <div className="input-group">
                  <AiOutlineMail className="input-icon" />
                  <Field type="email" name="email" placeholder="Enter your email" className={errors.email && touched.email ? "error" : ""} />
                </div>
                {errors.email && touched.email && <div className="auth-error-message">{errors.email}</div>}

                <label>Password</label>
                <div className="input-group">
                  <AiOutlineLock className="input-icon" />
                  <Field type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" className={errors.password && touched.password ? "error" : ""} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                    {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                  </button>
                </div>
                {errors.password && touched.password && <div className="auth-error-message">{errors.password}</div>}

                <button type="submit" className="signup-btn">
                  {loading ? <span className="spinner-border text-warning"></span> : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Signup;
