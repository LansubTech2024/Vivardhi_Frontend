import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AxiosService from "../../Components/AuthService/AuthService";
import "./Signup.css";
import Logo from "../../Images/lansubPT2.jpeg";

const Validate = Yup.object().shape({
  companyname: Yup.string()
      .min(2, 'Company name must be at least 2 characters')
      .required('Company name is required'),
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Must be atleast 8 characters")
    .max(15, "Must be less than 15 characters")
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Make it More Strong"
    ),
});

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  //ShowPassword function
  const PasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  //handle sign up
  const handleSignup = async (data) => {
    setLoading(true);
    try {
      let res = await AxiosService.post("signup/", data);
      if (res.status === 201) {
        toast.success("Account created successfully", {
          position: "top-center",
          autoClose: 3000, // 3 seconds
        });
        setTimeout(() => {
          navigate("/");
        }, 3000); // Navigate to login after 3 seconds
      }
    } catch (error) {
      if (error.response && error.response.status === 409) { // Assuming 409 is the status code for conflict/duplicate account
        toast.error("Already have an account", {
          position: "top-center",
          autoClose: 3000, // 3 seconds
        });
      } else {
        toast.error("Failed to create account. Please try again", {
          position: "top-center",
          autoClose: 3000, // 3 seconds
        });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-background">
          <img src={Logo} alt="Company Logo" className="logo-image" />
        </div>
        <div className="signup-form">
          <div className="signup-heading">
            <h2>Create Account</h2>
          </div>
          <Formik
            initialValues={{
              companyname: "",
              username:"",
              email: "",
              password: "",
            }}
            validationSchema={Validate}
            onSubmit={(values, { resetForm }) => {
              handleSignup(values);
              resetForm({ values: "" });
            }}
          >
            {({ errors, touched }) => (
              <Form className="signup-form-main">
                <div className="signup-form-div">
                  <Field
                    type="text"
                    name="companyname"
                    placeholder="Eg: Manufacturing"
                    className="signup-input"
                  />
                  {errors.companyname && touched.companyname && (
                    <p className="error-signup-message" style={{ color: "red" }}>{errors.companyname}</p>
                  )}
                </div>
                <div className="signup-form-div">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Eg: John"
                    className="signup-input"
                  />
                  {errors.username && touched.username && (
                    <p className="error-signup-message" style={{ color: "red" }}>{errors.username}</p>
                  )}
                </div>
                <div className="signup-form-div">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Eg: johnsmith@abc.com"
                    className="signup-input"
                  />
                  {errors.email && touched.email && (
                    <p className="error-signup-message" style={{ color: "red" }}>{errors.email}</p>
                  )}
                </div>
                <div className="signup-form-div">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    className="signup-input"
                  />
                  {errors.password && touched.password && (
                    <p className="error-signup-message" style={{ color: "red" }}>{errors.password}</p>
                  )}
                </div>
                <div className="signup-checkbox-container">
                  <input
                    className="signup-checkbox"
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
                    "Create Account"
                  )}
                </button>
                <p style={{ fontSize: "18px", textAlign:"center" }} className="acc-text">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    style={{ fontSize: "20px", textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </p>
                
              </Form>
            )}
          </Formik>
        
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Signup;
