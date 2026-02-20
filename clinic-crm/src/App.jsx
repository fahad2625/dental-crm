import { Routes, Route } from "react-router-dom";

import Navbar from "./Componets/Navbar/Navbar.jsx";
import Home from "./Componets/Home/Home.jsx";
import Footer from "./Componets/Footer/Footer.jsx";
import Appointment from "./Componets/Appointment/Appointment.jsx";

import Admin from "./Componets/Admin/Admin.jsx";
import OngoingPatients from "./Componets/Admin/OngoingPatients.jsx";
import PatientDetails from "./Componets/Admin/PatientDetails.jsx";
import Doctor from "./Componets/Doctors/DoctorsSection.jsx";
import Service from "./Componets/Services/ServicesSection.jsx";
import Location from"./Componets/Location/LocationSection.jsx";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/services" element={<Service />} />
        <Route path="/location" element={<Location />} />
        <Route path="/admin" element={<Admin />} />
        
       <Route path="/admin/patients" element={<OngoingPatients />} />
       <Route path="/admin/patient/:caseId" element={<PatientDetails />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
