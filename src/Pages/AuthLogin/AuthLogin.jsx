import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import AxiosService from "../../Components/AuthService/AuthService";
import "./AuthLogin.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSignIn = async (data) => {
    setLoading(true);
    try {
      let response = await AxiosService.post("login/", data);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.data.userData)
      );
      setLoading(false);
      navigate("/dashboard");
      toast.success("Welcome to OPFACT!", { position: "top-center" });
    } catch (error) {
      console.log(error);
      toast.error("Incorrect email or password", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h1>WELCOME TO OPFACT</h1>
        </div>
        <div className="login-right">
          <div className="form-box">
            <h1>Login </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSignIn}
            >
              {({ errors, touched }) => (
                <Form>
                  <label>Email address</label>
                  <div className="input-group">
                    <AiOutlineMail className="input-icon" />
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className={errors.email && touched.email ? "error" : ""}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <div className="auth-error-message">{errors.email}</div>
                  )}

                  <label>Password</label>
                  <div className="input-group">
                    <AiOutlineLock className="input-icon" />
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className={
                        errors.password && touched.password ? "error" : ""
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={24} />
                      ) : (
                        <AiOutlineEye size={24} />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div className="auth-error-message">{errors.password}</div>
                  )}

                  <div className="options">
                    <label>
                      <Field type="checkbox" name="rememberMe" /> Remember me
                    </label>
                    <Link to="/forgetpassword">Forgot password?</Link>
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign Up"}
                  </button>
                </Form>
              )}
            </Formik>
            <p>
              Don’t have an account?{" "}
              <Link to="/auth-signup">Create free account</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;
