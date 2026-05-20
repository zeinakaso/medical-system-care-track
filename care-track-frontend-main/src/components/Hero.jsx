import doctor from "../assets/doctor.png";
import { useNavigate } from "react-router-dom";
export default function Hero() {

 const navigate = useNavigate();

  const scrollToServices = () => {
    const section = document.getElementById("services-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/services");
    }
  };



  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#0d5f8a] to-[#0086c9] overflow-hidden flex items-center mt-20">

      {/* زخارف */}
      <div className="absolute top-10 left-10 text-white/20 text-6xl font-bold select-none">✚</div>
      <div className="absolute bottom-20 right-10 text-white/20 text-7xl font-bold rotate-12 select-none">✚</div>

      {/* نبض ECG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg width="80%" height="120">
          <polyline
            points="0,60 40,60 50,40 60,80 80,60 120,60 140,40 150,80 180,60 220,60 240,60 260,40 280,80 300,60"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* المحتوى */}
      <div className="relative z-10 w-full grid md:grid-cols-2 gap-10 px-10 md:px-20 items-center">

        {/* النص */}
        <div className="text-white space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
            Your Health, Our Mission
          </h1>

          <p className="text-lg md:text-xl text-white/90 drop-shadow">
            A smart healthcare system that helps you track your medical records,
            monitor your health, and stay connected with your doctors.
          </p>

          <div className="flex gap-4 pt-4">

            {/* GET STARTED */}
            <button
              onClick={() => navigate("/login")}
              className="
                px-7 py-3
                bg-white text-[#0d5f8a]
                font-semibold rounded-xl
                shadow-lg
                hover:scale-105 hover:shadow-2xl
                active:scale-95
                transition-all duration-300
              "
            >
              Get Started
            </button>

            {/* LEARN MORE */}
            <button
              onClick={scrollToServices}
              className="
                px-7 py-3
                bg-white/20 border border-white/40
                backdrop-blur-md text-white
                rounded-xl
                hover:bg-white/30
                hover:scale-105
                active:scale-95
                transition-all duration-300
              "
            >
              Learn More
            </button>

          </div>
        </div>

        {/* صورة الدكتور بعد تحسين الشكل */}
        <div className="flex justify-center">
          <img
            src={doctor}
            alt="doctor"
            className="
              w-full 
              max-w-md md:max-w-xl 
              object-cover 
              shadow-2xl 
              animate-slide-up-fade
              rounded-[40px] 
              border-4 
              border-white/30
            "
            style={{
              clipPath: 'ellipse(65% 80% at 50% 50%)'
            }}
          />
        </div>
      </div>

      {/* موجة احترافية بدون أي فراغات */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 320"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="
              M0,224 
              C120,240 240,280 360,280 
              C520,280 600,200 760,200 
              C920,200 1040,270 1200,270 
              C1320,270 1380,240 1440,220 
              V320 H0 Z
            "
          />
        </svg>
      </div>

      {/* الأنيميشن */}
      <style>
        {`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-slide-up-fade {
          animation: slideUpFade 1.2s ease-out forwards;
        }
        `}
      </style>

    </section>
  );
}
  //  *********************************************************************************************



//   import doctor from "../assets/doctor.png";
// import { useNavigate } from "react-router-dom";

// export default function Hero() {
//   const navigate = useNavigate();

//   const scrollToServices = () => {
//     const section = document.getElementById("services-section");
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     } else {
//       navigate("/services");
//     }
//   };

//   return (
//     <section className="relative w-full min-h-screen bg-gradient-to-br from-[#0d5f8a] to-[#0086c9] overflow-hidden flex items-center mt-20">

//       {/* decorations */}
//       <div className="absolute top-10 left-10 text-white/20 text-6xl font-bold select-none">✚</div>
//       <div className="absolute bottom-20 right-10 text-white/20 text-7xl font-bold rotate-12 select-none">✚</div>

//       {/* ECG */}
//       <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
//         <svg width="80%" height="120">
//           <polyline
//             points="0,60 40,60 50,40 60,80 80,60 120,60 140,40 150,80 180,60 220,60 240,60 260,40 280,80 300,60"
//             fill="none"
//             stroke="white"
//             strokeWidth="3"
//           />
//         </svg>
//       </div>

//       {/* content */}
//       <div className="relative z-10 w-full grid md:grid-cols-2 gap-10 px-10 md:px-20 items-center">

//         {/* text */}
//         <div className="text-white space-y-6">
//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
//             Your Health, Our Mission
//           </h1>

//           <p className="text-lg md:text-xl text-white/90">
//             A smart healthcare system that helps you track your medical records,
//             monitor your health, and stay connected with your doctors.
//           </p>

//           <div className="flex gap-4 pt-4">

//             {/* GET STARTED */}
//             <button
//               onClick={() => navigate("/login")}
//               className="
//                 px-7 py-3
//                 bg-white text-[#0d5f8a]
//                 font-semibold rounded-xl
//                 shadow-lg
//                 hover:scale-105 hover:shadow-2xl
//                 active:scale-95
//                 transition-all duration-300
//               "
//             >
//               Get Started
//             </button>

//             {/* LEARN MORE */}
//             <button
//               onClick={scrollToServices}
//               className="
//                 px-7 py-3
//                 bg-white/20 border border-white/40
//                 backdrop-blur-md text-white
//                 rounded-xl
//                 hover:bg-white/30
//                 hover:scale-105
//                 active:scale-95
//                 transition-all duration-300
//               "
//             >
//               Learn More
//             </button>

//           </div>
//         </div>

//         {/* image */}
//         <div className="flex justify-center">
//           <img
//             src={doctor}
//             alt="doctor"
//             className="
//               w-full max-w-md md:max-w-xl
//               object-cover shadow-2xl
//               animate-slide-up-fade
//               rounded-[40px]
//               border-4 border-white/30
//             "
//             style={{ clipPath: "ellipse(65% 80% at 50% 50%)" }}
//           />
//         </div>
//       </div>

//       {/* wave */}
//       <div className="absolute bottom-0 left-0 w-full">
//         <svg viewBox="0 0 1440 320" className="w-full block" preserveAspectRatio="none">
//           <path
//             fill="#ffffff"
//             d="
//               M0,224 
//               C120,240 240,280 360,280 
//               C520,280 600,200 760,200 
//               C920,200 1040,270 1200,270 
//               C1320,270 1380,240 1440,220 
//               V320 H0 Z
//             "
//           />
//         </svg>
//       </div>

//       {/* animation */}
//       <style>{`
//         @keyframes slideUpFade {
//           0% { opacity: 0; transform: translateY(40px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }

//         .animate-slide-up-fade {
//           animation: slideUpFade 1.2s ease-out forwards;
//         }
//       `}</style>

//     </section>
//   );
// }