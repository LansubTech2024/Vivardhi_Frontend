import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AiOutlineLock, AiOutlineUser, AiOutlineMail, AiOutlineCheckCircle, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineArrowRight, AiOutlineHome } from 'react-icons/ai';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Validation Schemas
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  });

  const signupSchema = Yup.object().shape({
    companyName: Yup.string()
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
    email: '',
    password: '',
    companyName: '',
    username: ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', values);
      setSubmitting(false);
      resetForm();
    }, 1000);
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

        {/* Right Side - Auth Form */}
        <div className="auth-form-container">
          <div className="auth-form-box">
            <div className="auth-header">
              <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p>{isLogin ? 'Access your dashboard' : 'Begin your journey'}</p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={isLogin ? loginSchema : signupSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="auth-form">
                  {!isLogin && (
                    <div className="form-group">
                      <div className="input-wrapper">
                        <div className="input-group">
                          <AiOutlineHome className="input-icon" />
                          <Field
                            type="text"
                            name="companyName"
                            placeholder="Company Name"
                            className={errors.companyName && touched.companyName ? 'error' : ''}
                          />
                        </div>
                        {errors.companyName && touched.companyName && (
                          <div className="error-message">{errors.companyName}</div>
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
                          <div className="error-message">{errors.username}</div>
                        )}
                      </div>
                    </div>
                  )}

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
                        <div className="error-message">{errors.email}</div>
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
                        <div className="error-message">{errors.password}</div>
                      )}
                    </div>
                  </div>

                  {isLogin && (
                    <div className="form-options">
                      <label className="remember-me">
                        <Field type="checkbox" name="rememberMe" />
                        <span>Remember me</span>
                      </label>
                      <button type="button" className="forgot-password">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className={`submit-button ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      <>
                        {isLogin ? 'Sign in to Dashboard' : 'Create Account'}
                        <AiOutlineArrowRight />
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="auth-toggle">
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin 
                  ? "Don't have an account? Create one now" 
                  : "Already have an account? Sign in instead"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
