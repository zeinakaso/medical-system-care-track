
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./componentLogin-Register/Login";
import Register from "./componentLogin-Register/Register";
import Services from "./components/navHome/Services";
import About from "./components/navHome/About";
import Contact from "./components/navHome/Contact";




import AdminDashboard from "./components/AdminDashboard";
import AdminHome from "./components/AdminHome.jsx";
import AdminUsers from "./components/admin/AdminUsers.jsx";
import AdminPatients from "./components/admin/AdminPatients.jsx";
import AdminDoctors from "./components/admin/AdminDoctors.jsx";
import AdminSettings from "./components/admin/AdminSettings.jsx";
import AdminAnalytics from "./components/admin/AdminAnalytics.jsx";
import AdminRelatives from "./components/admin/AdminRelatives.jsx";
import AdminVitals  from "./components/admin/AdminVitals.jsx";
import AdminTreatments from "./components/admin/AdminTreatments.jsx";





import PatientDashboard2 from "./components/patient/PatientDashboard2";
import PatientHome from "./components/patient/PatientHome.jsx";

import PatientVitals from "./components/patient/PatientVitals";
import PatientHistory from "./components/patient/PatientHistory";
import PatientTreatment from "./components/patient/PatientTreatment";
import PatientAppointments from "./components/patient/PatientAppointments";
import PatientNotifications from "./components/patient/PatientNotifications";
import PatientMessages from "./components/patient/PatientMessages";
import PatientReports from "./components/patient/PatientReports";














import DoctorDashboard from "./components/DoctorDashboard";
import DoctorHome from "./components/DoctorHome.jsx";
import PatientDashboard from "./components/PatientDashboard";
import CaregiverDashboard from "./components/CaregiverDashboard";
import DoctorAnalytics from "./components/doctor/DoctorAnalytics.jsx";


import DoctorNotifications from "./components/doctor/DoctorNotifications";
import DoctorPatients from "./components/DoctorHome.jsx";
import Prescriptions from "./components/doctor/Prescriptions.jsx";
import Reports from "./components/doctor/Reports.jsx";

import Setting from "./components-admin/Setting.jsx";
import AdminContact from "./components-admin/Contact.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

       <Route path="/setting" element={<Setting />} />
       <Route path="/contact-us" element={<AdminContact />} />

        {/* Doctor */}
        <Route path="/doctor" element={<DoctorDashboard />}>
    <Route index element={<DoctorHome />} /> {/* صفحة البداية */}
    <Route path="/doctor/patients" element={<DoctorPatients />} />
    <Route path="/doctor/notifications" element={<DoctorNotifications />} />
    <Route path="analytics" element={<DoctorAnalytics />} />
  </Route>

      
        {/* admin */}
       <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<AdminHome />} />            {/* الصفحة الرئيسية للـ Admin */}
        <Route path="analytics" element={<AdminAnalytics />} /> {/* Analytics صفحة مستقلة */}
        <Route path="users" element={<AdminUsers />} />
        <Route path="patients" element={<AdminPatients />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="relatives" element={<AdminRelatives />} />
       <Route path="vitals" element={<AdminVitals />} />
       <Route path="treatments" element={<AdminTreatments />} />
       


       </Route>




{/* /* Patient */ }
<Route path="/patient" element={<PatientDashboard />}>

  {/* الصفحة الرئيسية */}
  <Route index element={<PatientHome />} />

  {/* الصفحات */}
  <Route path="vitals" element={<PatientVitals />} />
  <Route path="history" element={<PatientHistory />} />
  <Route path="treatment" element={<PatientTreatment />} />

  {/* ⭐ الإضافات */}
  <Route path="appointments" element={<PatientAppointments />} />
  <Route path="notifications" element={<PatientNotifications />} />
  <Route path="messages" element={<PatientMessages />} />
  <Route path="reports" element={<PatientReports />} />

</Route>


     


        {/* Other Dashboards */}
        {/* <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} /> */}

        {/* <Route path="/patient" element={<PatientDashboard />} /> */}
        <Route path="/caregiver" element={<CaregiverDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

