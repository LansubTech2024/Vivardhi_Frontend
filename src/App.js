import "./App.css";
import Home from './Pages/Home/Home';
import HelpandSupport from "./Pages/HelpandSupport/HelpandSupport";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PowerUsage from "./Pages/PowerUsage/PowerUsage.jsx";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import About from "./Pages/About/About";
import Resources from "./Pages/Resource/Resource";
import Profile from"./Pages/Profile/Profile";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ForgetPassword from "./Pages/Forgetpassword/Forgetpassword";
import ResetPassword from "./Pages/Resetpassword/Resetpassword";
import Inventory from "./Pages/Inventory/Inventory";
import Company from "./Pages/WhereYouStand/WhereYouStand.jsx";
import Auth from "./Pages/Auth/Auth";
import OEEanalysis from "./Pages/OEE analysis/OEE analysis.js";
import MachineDetails from "./Pages/Machine_Detailes/Machine_details.js";
import ProductivityTable from "./Pages/Productivity/Productivity.jsx";
import MachineAnalysis from "./Pages/AnalysisMachine/MachineAnalysis.jsx";

import Report from "./Pages/Report/Report.js";

import AuthLogin from "./Pages/AuthLogin/AuthLogin.jsx";
import AuthSignup from "./Pages/AuthSignup/AuthSignup.jsx";

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/help" element={<HelpandSupport/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/power-usage" element={<PowerUsage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/forgetpassword" element={<ForgetPassword/>}/>
        <Route path="/resetpassword/:randomString/:expirationTimestamp" element={<ResetPassword/>}/>
        <Route path="/raw-material" element={<Inventory/>}/>
        <Route path="/company" element={<Company/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/oeeanalysis" element={<OEEanalysis/>}/>
        <Route path="/machine-details/:id" element={<MachineDetails/>}/>
        <Route path="/productivity" element={<ProductivityTable/>}/>
        <Route path="/machine-analysis" element={<MachineAnalysis/>}/>

        <Route path="/Report" element={<Report/>}/>

        <Route path="/auth-login" element={<AuthLogin/>}/>
        <Route path="/auth-signup" element={<AuthSignup/>}/>

        </Routes>
    </BrowserRouter>
  )
}

export default App;
