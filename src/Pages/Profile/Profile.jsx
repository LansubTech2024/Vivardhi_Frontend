import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';  // Formik imports
import * as Yup from 'yup';  // Yup for validation
import './Profile .css';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    designation: Yup.string().required('Designation is required'),
});

const ProfileForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        designation: ''
    });
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('https://vivardhi.in/api/auth/update-profile/', {
                    withCredentials: true
                });
                setInitialValues({
                    name: response.data.name,
                    email: response.data.email,
                    designation: response.data.designation || 'Not specified'
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axios.put('http://127.0.0.1:8000/api/auth/update-profile/', values, {
                withCredentials: true
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;  // Show loading state while data is being fetched
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="profile-container">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize  // Reinitialize form with fetched data
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="profile-details">
                                <h3>Profile Details</h3>

                                <label>Name:</label>
                                <Field 
                                    type="text" 
                                    name="name"
                                    className="input-field"
                                />
                                <ErrorMessage name="name" component="div" className="error-message" />

                                <label>Email:</label>
                                <Field 
                                    type="email" 
                                    name="email"
                                    className="input-field"
                                    disabled  // Read-only field
                                />
                                <ErrorMessage name="email" component="div" className="error-message" />

                                <label>Designation:</label>
                                <Field 
                                    type="text" 
                                    name="designation"
                                    className="input-field"
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
        </>
    );
};

export default ProfileForm;
