import { useState, useEffect } from "react";
import AxiosService from "../../Components/AuthService/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Login.css";
import Logo from "../../Images/lansubPT2.jpeg";

const Validate = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Must be atleast 8 characters")
    .max(15, "Must be less than 15 characters")
    .required("Required"),
});

const Login = () => {
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  //ShowPassword function
  const PasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (data) => {
    setLoading(true);
    try {
      let response = await AxiosService.post("login/", data);
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
        toast.success("login successful", {
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
    <div className="login-container">
      <div className="login-part">
        <div className="login-background">
          <div className="logo">
            <img
              src={Logo}
              alt="logo"
              className="logo-img"
              
            />
          </div>
        </div>
        <div className="login-form">
          <div className="login-heading" style={{ textAlign: "center", color:"black", fontWeight:"bold"}}>
            {isReturningUser ? (
              <>
                <div
                  style={{
                    fontSize: "20px", // Font size for "Welcome Back"
                    letterSpacing: "1px", // Letter spacing for "Welcome Back"
                  }}
                >
                  Welcome Back
                </div>
                <div
                  style={{
                    fontSize: "30px", // Larger font size for "Vivardhi"
                    letterSpacing: "3px", // Increased letter spacing for "Vivardhi"
                    marginTop: "5px", // Optional: Adjusts space between the two lines
                  }}
                >
                  VIVARDHI
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    fontSize: "20px", // Font size for "Welcome To"
                    letterSpacing: "1px", // Letter spacing for "Welcome To"
                  }}
                >
                  Welcome To
                </div>
                <div
                  style={{
                    fontSize: "30px", // Larger font size for "Vivardhi"
                    letterSpacing: "3px", // Increased letter spacing for "Vivardhi"
                    marginTop: "5px", 
                    fontFamily:"monospace"// Optional: Adjusts space between the two lines
                  }}
                >
                  VIVARDHI
                </div>
              </>
            )}
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Validate}
            onSubmit={(values, { resetForm }) => {
              handleSignIn(values);
              resetForm({ values: "" });
            }}
          >
            {({ errors, touched }) => (
              <Form className="form">
                <div className="form-div">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Eg: john@abc.com"
                    className="input"
                  />
                  {errors.email && touched.email && (
                    <p className="error-message" style={{ color: "red" }}>
                      {errors.email}
                    </p>
                  )}
                </div>
                <br />

                <div className="form-div">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    className="input"
                  />
                  {errors.password && touched.password && (
                    <p className="error-message" style={{ color: "red" }}>
                      {errors.password}
                    </p>
                  )}
                </div>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={PasswordVisible}
                    className="checkbox"
                  />
                  <p>Show Password</p>
                  <Link to="/forgetpassword" className="forgot">
                    Forgot Password?
                  </Link>
                </label>
                <button
                  type="submit"
                  className="col-12 btn btn-lg btn-block login-btn mt-4 mb-4 d-flex justify-content-center"
                >
                  {loading ? (
                    <span className="spinner-border text-warning"></span>
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="signup">
                  <p>Don&apos;t have an account?</p>
                  <Link to="/signup" className="signup-link">
                    Signup
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;
