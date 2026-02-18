import { Routes, Route } from "react-router-dom";

import Navbar from "./Componets/Navbar/Navbar.jsx";
import Home from "./Componets/Home/Home.jsx";
import Footer from "./Componets/Footer/Footer.jsx";
import Appointment from "./Componets/Appointment/Appointment.jsx";

import Admin from "./Componets/Admin/Admin.jsx";
import OngoingPatients from "./Componets/Admin/OngoingPatients.jsx";
import PatientDetails from "./Componets/Admin/PatientDetails.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />

        <Route path="/admin" element={<Admin />} />
        
       <Route path="/admin/patients" element={<OngoingPatients />} />
       <Route path="/admin/patient/:caseId" element={<PatientDetails />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
