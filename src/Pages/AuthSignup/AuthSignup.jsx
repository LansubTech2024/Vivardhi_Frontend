import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {  Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../Images/logo3.png";
import * as Yup from 'yup';
import { AiOutlineLock, AiOutlineUser, AiOutlineMail, AiOutlineCheckCircle, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineArrowRight, AiOutlineHome } from 'react-icons/ai';
import AxiosService from "../../Components/AuthService/AuthService";
import '../Auth/Auth.css';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const signupSchema = Yup.object().shape({
    companyname: Yup.string()
      .min(2, 'Company name must be at least 2 characters')
      .required('Company name is required'),
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
      )
      .required('Password is required')
  });

  const initialValues = {
    companyname: '',
    username: '',
    email: '',
    password: ''
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
          window.location.href = '/';
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
              width={70}
              height={80}
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

        {/* Right Side - Signup Form */}
        <div className="auth-form-container">
          <div className="auth-form-box">
            <div className="auth-header">
              <h2>Create Account</h2>
              <p>Begin your journey</p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={signupSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="auth-form">
                  <div className="form-group">
                    <div className="input-wrapper">
                      <div className="input-group">
                        <AiOutlineHome className="input-icon" />
                        <Field
                          type="text"
                          name="companyname"
                          placeholder="Company Name"
                          className={errors.companyname && touched.companyname ? 'error' : ''}
                        />
                      </div>
                      {errors.companyname && touched.companyname && (
                        <div className="auth-error-message">{errors.companyname}</div>
                      )}
                    </div>

                    <div className="input-wrapper">
                      <div className="input-group">
                        <AiOutlineUser className="input-icon" />
                        <Field
                          type="text"
                          name="username"
                          placeholder="Username"
                          className={errors.username && touched.username ? 'error' : ''}
                        />
                      </div>
                      {errors.username && touched.username && (
                        <div className="auth-error-message">{errors.username}</div>
                      )}
                    </div>
                    {/* <div className="input-wrapper">
                      <div className="input-group">
                        <AiOutlineUser className="input-icon" />
                        <Field
                          type="text"
                          name="phonenumber"
                          placeholder="Phonenumber"
                          className={errors.phonenumber && touched.phonenumber ? 'error' : ''}
                        />
                      </div>
                      {errors.phonenumber && touched.phonenumber && (
                        <div className="auth-error-message">{errors.phonenumber}</div>
                      )}
                    </div> */}
                  </div>


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

                  <button 
                    type="submit" 
                    className="submit-btn col-12 btn btn-lg btn-block login-btn mt-4 mb-4 d-flex justify-content-center"
                  >
                    {loading ? (
                      <span className="spinner-border text-warning"></span>
                    ) : (
                      <>
                        Create Account
                        <AiOutlineArrowRight />
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="auth-toggle">
              <Link to = "/">
                Already have an account? <span>Sign in instead</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Signup;