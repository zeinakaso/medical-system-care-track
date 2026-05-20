// import { Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./Navbar";
// import Hero from "./Hero";
// import Features from "./Features";
// import Features2 from "./Features2";
// import HealthStats from "./HealthStats";
// import TimelineSection from "./TimelineSection";
// import AnalyticsSection from "./AnalyticsSection";
// import Footer from "./Footer";

// import Login from "../componentLogin-Register/Login";
// import Register from "../componentLogin-Register/Register";

// export default function Home() {
//   const location = useLocation();

//   // صفحات ما بدنا Navbar فيها
//   const hideNavbar =
//     location.pathname === "/login" ||
//     location.pathname === "/register";

//   return (
//     <>
//       {!hideNavbar && <Navbar />}


//       <Routes>
//         {/* الصفحة الرئيسية */}
//         <Route
//           path="/"
//           element={
//             <>
//               <Hero />
//               <Features />
//               <Features2 />
//               <HealthStats />
//               <TimelineSection />
//               <AnalyticsSection />
//               <Footer />
//             </>
//           }
//         />

//         {/* صفحات المصادقة */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </>
//   );
// }



import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Features2 from "./Features2";
import HealthStats from "./HealthStats";
import TimelineSection from "./TimelineSection";
import AnalyticsSection from "./AnalyticsSection";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Features2 />
      <HealthStats />
      <TimelineSection />
      <AnalyticsSection />
      <Footer />
    </>
  );
}
