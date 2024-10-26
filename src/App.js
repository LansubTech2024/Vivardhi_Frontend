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
import Temperature from './Pages/Temperature/Temperature';
import Pressure from './Pages/Pressure/Pressure';
import OEEData from './Pages/OEEData/OEEData';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ForgetPassword from "./Pages/Forgetpassword/Forgetpassword";
import ResetPassword from "./Pages/Resetpassword/Resetpassword";
import OEEmetrics from "./Pages/OEE metrics/OEE metrics";
import Inventory from "./Pages/Inventory/Inventory";
import CNCDashboard from "./Pages/CNC machine/CNC machine.js";
import Detailedmachine from "./Pages/Machine/Machine1.js";
import Detailedmachine02 from "./Pages/Machine/Machine2.js";
import Company from "./Pages/WhereYouStand/WhereYouStand.jsx";
import Auth from "./Pages/Auth/Auth";
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
        <Route path="/temperature" element={<Temperature/>}/>
        <Route path="/pressure" element={<Pressure/>}/>
        <Route path="/oee-data" element={<OEEData/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/forgetpassword" element={<ForgetPassword/>}/>
        <Route path="/resetpassword/:randomString/:expirationTimestamp" element={<ResetPassword/>}/>
        <Route path="/oeemetrics" element={<OEEmetrics/>}/>
        <Route path="/raw-material" element={<Inventory/>}/>
        <Route path="/cncmachine" element={<CNCDashboard/>}/>
        <Route path="/detailedmachine" element={<Detailedmachine/>}/>
        <Route path="/detailedmachine02" element={<Detailedmachine02/>}/>
        <Route path="/company" element={<Company/>}/>
        <Route path="/auth" element={<Auth/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
