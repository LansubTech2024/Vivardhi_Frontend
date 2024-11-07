import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup';
import { AiOutlineLock,AiOutlineCheckCircle, AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineArrowRight, AiOutlineHome } from 'react-icons/ai';
import AxiosService from "../../Components/AuthService/AuthService";
import '../Auth/Auth.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const res = await AxiosService.post("login/", values);
      
      if (res.status === 200) {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
            resetForm();
            window.location.href = '/home';
          }, 3000);
      }
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      if (error.response && error.response.status === 401) {
        errorMessage = "Invalid credentials";
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
              <AiOutlineHome className="logo-icon" />
              <h1>ManufacturePro ERP</h1>
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
              <h2>Welcome Back</h2>
              <p>Access your dashboard</p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
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
                      Forgot password?
                    </button>
                  </div>

                  <button 
                    type="submit" 
                    className={`submit-button ${loading ? 'loading' : ''}`}
                    disabled={loading || isSubmitting}
                  >
                    {loading ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      <>
                        Sign in to Dashboard
                        <AiOutlineArrowRight />
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="auth-toggle">
              <button onClick={() => window.location.href = '/auth-signup'}>
                Don't have an account? Create one now
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