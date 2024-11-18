import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../Images/logo3.png";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup';
import { AiOutlineLock,AiOutlineCheckCircle, AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineArrowRight, AiOutlineHome } from 'react-icons/ai';
import AxiosService from "../../Components/AuthService/AuthService";
import '../Auth/Auth.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  // eslint-disable-next-line
  const [loggedUser, setLoggedUser] = useState("");
  const [token, setToken] = useState("");
  // eslint-disable-next-line
  const [config, setConfig] = useState({
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  });

  const initialValues = {
    email: '',
    password: ''
  };

  useEffect(() => {
    const loggedInUserJson = localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      try {
        const user = JSON.parse(loggedInUserJson);
        if (user && user.userData && user.token) {
          setLoggedUser(user.userData);
          setToken(user.token);
          setConfig({
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          });
        } else {
          console.log("Stored user data is incomplete");
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("loggedInUser"); 
      }
    }

    AxiosService.get("/")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSignIn = async (data) => {
    setLoading(true);
    try {
      let response = await AxiosService.post("login/", data);
      // Check if this email exists in localStorage
      const existingUser = localStorage.getItem("loggedInUser");
      const isNewUser = !existingUser;
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.data.userData)
      );
      setLoggedUser(response.data.userData);
      setToken(response.data.token);
      setConfig({
        headers: {
          authorization: `bearer ${response.data.token}`,
        },
      });

      setLoading(false);

      navigate("/dashboard");

      if (response.status === 201) {
        toast.success(isNewUser ? "Welcome to ManufacturePro ERP!" : "Welcome back to ManufacturePro ERP!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Incorrect email or password", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsReturningUser(true);
      setLoading(false);
    }
  };
  

  return (
    <div className="auth-container">
      {/* Animated Background */}
      <div className="area">
        <ul className="circles">
          {[...Array(10)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="auth-content">
        {/* Left Side - Branding */}
        <div className="branding-section">
          <div className="brand-header">
            <div className="brand-logo">
            <img
              src={Logo}
              alt="logo"
              className="logo-img"
              width={100}
              height={100}
            />
            <h1>OPFACT</h1>
            </div>
            <p className="brand-description">
              Next-Generation Manufacturing Solutions
            </p>
          </div>

          <div className="features-grid">
            {[
              'Real-time Production Tracking',
              'Inventory Management',
              'Quality Assurance',
              'Resource Planning',
              'Supply Chain Integration',
              'Analytics Dashboard'
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <AiOutlineCheckCircle className="feature-icon" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="auth-form-container">
          <div className="auth-form-box">
            <div className="auth-header">
            <h2>{isReturningUser ? "Welcome Back" : "Welcome to"}</h2>
            <p>{isReturningUser ? "Access your dashboard" : "OPFACT"}</p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSignIn}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="auth-form">
                  <div className="form-group">
                    <div className="input-wrapper">
                      <div className="input-group">
                        <AiOutlineMail className="input-icon" />
                        <Field
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          className={errors.email && touched.email ? 'error' : ''}
                        />
                      </div>
                      {errors.email && touched.email && (
                        <div className="auth-error-message">{errors.email}</div>
                      )}
                    </div>

                    <div className="input-wrapper">
                      <div className="input-group">
                        <AiOutlineLock className="input-icon" />
                        <Field
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Password"
                          className={errors.password && touched.password ? 'error' : ''}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="password-toggle"
                        >
                          {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                        </button>
                      </div>
                      {errors.password && touched.password && (
                        <div className="auth-error-message">{errors.password}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-options">
                    <label className="remember-me">
                      <Field type="checkbox" name="rememberMe" />
                      <span>Remember me</span>
                    </label>
                    <button type="button" className="forgot-password">
                    <Link to="/forgetpassword" className="forgot">
                    Forgot Password?
                  </Link>
                    </button>
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn col-12 btn btn-lg btn-block login-btn mt-4 mb-4 d-flex justify-content-center"
                  >
                    <span className = "button-content">
                    {loading ? (
                      <span className="spinner-border text-warning"></span>
                    ) : (
                      <>
                        Sign in to Dashboard
                        <AiOutlineArrowRight />
                      </>
                    )}
                    </span>
                  </button>
                </Form>
              )}
            </Formik>

            <div className="auth-toggle">
              <button onClick={() => window.location.href = '/auth-signup'}>
                Don't have an account?<span>Create one now</span> 
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;