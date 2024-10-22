
import React, { useState } from "react";
import AxiosService from "../../Components/AuthService/AuthService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Forgetpassword.css";
import Logo from "../../Images/lansubPT2.jpeg";

const Validate = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleForgot = async (data) => {
    setLoading(true);
    try {
      let res = await AxiosService.post("forgot-password/", data);
      if (res.status === 201) {
        toast.success("Reset link sent successfully your email.please check the email", {
          position: "top-center",
          autoClose: 3000, 
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-part">
      <div className="forgot-background">
          <img src={Logo} alt="Company Logo" className="logo-image" />
        </div>
        <h2>Forget Password</h2>
        <p>Enter your registered email to receive a password reset link.</p>
        <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Validate}
            onSubmit={(values, { resetForm }) => {
              handleForgot(values);
              resetForm({ values: "" });
            }}
          >
            {({ errors, touched }) => (
              <Form className="forgot-form-main">
                <div className="forgot-form-div">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Eg: johnsmith@abc.com"
                    className="forgot-input"
                  />
                  {errors.email && touched.email && (
                    <p className="error-forgot-message" style={{ color: "red" }}>{errors.email}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="col-12 btn btn-lg btn-block login__btn mt-4 mb-4 d-flex justify-content-center"
                >
                  {loading ? (
                    <span className="spinner-border text-warning"></span>
                  ) : (
                    "Sent reset link"
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
export default ForgetPassword;