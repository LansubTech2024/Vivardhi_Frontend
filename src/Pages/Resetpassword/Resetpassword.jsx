
import React, { useState } from "react";
import AxiosService from "../../Components/AuthService/AuthService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Restpassword.css";
import Logo from "../../Images/lansubPT2.jpeg";

const Validate = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ResetPassword = () => {
  const[password,setPassword] = useState("");
  const[confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //ShowPassword function
  const PasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  const { randomString, expirationTimestamp } = useParams();
  const navigate = useNavigate();

  const handleReset = async () => {
    setLoading(true);
    try {
      let res = await AxiosService.post(`reset-password/${randomString}/${expirationTimestamp}`, {
          newPassword: password,
          confirmPassword: confirmPassword,
      });
      if (res.status === 201) {
        toast.success("Password updated successfully", {
          position: "top-center",
          autoClose: 3000, 
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid token or token has expired.Please request a new reset link.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-part">
      <div className="reset-background">
          <img src={Logo} alt="Company Logo" className="logo-image" />
        </div>
        <h2>Reset Password</h2>
        <p>Enter your new password.</p>
        <Formik
            initialValues={{
              password: "",
              confirmPassword:"",
            }}
            validationSchema={Validate}
            onSubmit={(values, { resetForm }) => {
              handleReset(values);
              resetForm({ values: "" });
            }}
          >
            {({ errors, touched }) => (
              <Form className="reset-form-main">
                <div className="reset-form-div">
                  <label>New Password</label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="********"
                    className="reset-input"
                  />
                  {errors.password && touched.password && (
                    <p className="error-reset-message" style={{ color: "red" }}>{errors.password}</p>
                  )}
                </div>
                <div className="reset-form-div">
                  <label>Confirm Password</label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="********"
                    className="reset-input"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="error-reset-message" style={{ color: "red" }}>{errors.confirmPassword}</p>
                  )}
                </div> 
                <div className="reset-checkbox-div">
                  <input
                    className="reset-checkbox"
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={PasswordVisible}
                  />
                  <label htmlFor="showPassword"> Show Password</label>
                </div>
                <button
                  type="submit"
                  className="col-12 btn btn-lg btn-block login__btn mt-4 mb-4 d-flex justify-content-center"
                >
                  {loading ? (
                    <span className="spinner-border text-warning"></span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </Form>
            )}
          </Formik>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ResetPassword;