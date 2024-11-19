import { useState, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from 'formik';  
import * as Yup from 'yup';  
import './Profile .css';
import AxiosService from "../../Components/AuthService/AuthService";
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';

// Validation schema using Yup
const validationSchema = Yup.object({
    companyname: Yup.string().required('Company name is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    designation: Yup.string().required('Designation is required'),
});

const ProfileForm = () => {
    const [loading, setLoading] = useState(true);
    const[token, setToken] = useState("")
    const [loggedUser, setLoggedUser] = useState("");

    const [initialValues, setInitialValues] = useState({
        companyname: loggedUser.companyname,
        name:loggedUser.username,
        email: loggedUser.email,
        designation: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInitialValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };

    const navigate = useNavigate();
    const handleSubmit = async(data ,{ setSubmitting }) => {
        setSubmitting(true);
        try {
            const response = await AxiosService.put("updateprofile/", data);
            const user = response.data.matcheduser;
            const updatedData = { token, user };
            localStorage.setItem("loggedInUser", JSON.stringify(updatedData));
            setLoggedUser(updatedData.user);
            toast.success("Profile updated successfully");
            setLoading(false);
            setTimeout(() => {
              navigate("/class");
            }, 2000);
          } catch (err) {
            toast.error("Something went wrong , Please try again later");
          } finally {
            setLoading(false);
          }
        setSubmitting(false);
      };

    return (
        <>
            <Header />
            <Sidebar />
            <div className="profile-container">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize  
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="profile-details">
                                <h3>Profile Details</h3>

                                <label>Company Name:</label>
                                <Field 
                                    type="text"
                                    id="companyname" 
                                    name="companyname"
                                    className="input-field"
                                    value={initialValues.companyname}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="companyname" component="div" className="error-message" />

                                <label>User Name:</label>
                                <Field 
                                    type="text" 
                                    name="username"
                                    id="username"
                                    className="input-field"
                                    value={initialValues.username}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="username" component="div" className="error-message" />

                                <label>Email:</label>
                                <Field 
                                    type="email" 
                                    name="email"
                                    id="email"
                                    className="input-field"
                                    value={initialValues.email}
                                    onChange={handleChange}
                                   
                                />
                                <ErrorMessage name="email" component="div" className="error-message" />

                                <label>Designation:</label>
                                <Field 
                                    type="text" 
                                    name="designation"
                                    id="designation"
                                    className="input-field"
                                    value={initialValues.designation}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="designation" component="div" className="error-message" />
                            </div>
                            <button type="submit" className='save-btn' disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
};

export default ProfileForm;
