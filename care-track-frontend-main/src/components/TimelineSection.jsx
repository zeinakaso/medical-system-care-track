// /* eslint-disable no-unused-vars */
// import { motion } from "framer-motion";
// import {
//   LogIn,
//   UploadCloud,
//   Activity,
//   MessagesSquare,
//   HeartPulse,
// } from "lucide-react";

// export default function TimelineSection() {
//   const steps = [
//     {
//       icon: <LogIn size={36} />,
//       title: "Login to Your Account",
//       desc: "Secure access to your personal health dashboard.",
//     },
//     {
//       icon: <UploadCloud size={36} />,
//       title: "Upload Medical Records",
//       desc: "Easily add your reports, scans, and prescriptions.",
//     },
//     {
//       icon: <Activity size={36} />,
//       title: "Track Your Condition",
//       desc: "Live monitoring of vitals and health indicators.",
//     },
    
//     {
//       icon: <HeartPulse size={36} />,
//       title: "Receive Recommendations",
//       desc: "Personalized care suggestions based on your data.",
//     },
//   ];

//   return (
//     <section className="w-full py-24 bg-white" id="timeline">
//       <div className="container mx-auto px-6 text-center">

//         <h2 className="text-5xl font-extrabold text-blue-700 tracking-tight mb-4">
//           How Patients Use CareTrack
//         </h2>

//         <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full mx-auto mb-16"></div>

//         <div className="relative max-w-3xl mx-auto">
//           <div className="absolute left-8 md:left-1/2 h-full border-l-4 border-blue-200"></div>

//           <div className="flex flex-col gap-20">
//             {steps.map((step, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: i * 0.2 }}
//                 viewport={{ once: true }}
//                 className={`relative flex items-center gap-6 ${
//                   i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//                 }`}
//               >

//                 {/* 🔵 أيقونة ناعمة وجذابة */}
//                 <div
//                   className="
//                     w-20 h-20 rounded-full flex items-center justify-center
//                     bg-gradient-to-br from-blue-500 to-blue-700
//                     text-white shadow-xl absolute
//                     left-0 md:left-1/2 md:-translate-x-1/2
//                     ring-4 ring-blue-100
//                   "
//                   style={{
//                     top: "-30px",
//                     boxShadow: "0 0 18px rgba(30, 144, 255, 0.45)",
//                     transform: "translateY(-10px)",
//                   }}
//                 >
//                   {step.icon}
//                 </div>

//                 {/* الكارد */}
//                 <div
//                   className="
//                     bg-white shadow-lg p-6 rounded-2xl border border-blue-100
//                     w-full md:w-1/2 mx-auto pt-14
//                   "
//                 >
//                   <h3 className="text-xl font-bold text-blue-800 mb-2">
//                     {step.title}
//                   </h3>
//                   <p className="text-gray-600">{step.desc}</p>
//                 </div>

//               </motion.div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }
// // 2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  LogIn,
  UploadCloud,
  Activity,
  HeartPulse,
} from "lucide-react";

export default function TimelineSection() {

  const steps = [
    {
      icon: <LogIn size={34} />,
      title: "Login to Your Account",
      desc: "Secure access to your personal health dashboard.",
      color: "from-blue-500 to-cyan-400",
      glow: "bg-blue-400/20",
    },

    {
      icon: <UploadCloud size={34} />,
      title: "Upload Medical Records",
      desc: "Easily add your reports, scans, and prescriptions.",
      color: "from-cyan-500 to-sky-400",
      glow: "bg-cyan-400/20",
    },

    {
      icon: <Activity size={34} />,
      title: "Track Your Condition",
      desc: "Live monitoring of vitals and health indicators.",
      color: "from-indigo-500 to-blue-500",
      glow: "bg-indigo-400/20",
    },

    {
      icon: <HeartPulse size={34} />,
      title: "Receive Recommendations",
      desc: "Personalized care suggestions based on your data.",
      color: "from-sky-500 to-cyan-500",
      glow: "bg-sky-400/20",
    },
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        py-32
        bg-gradient-to-b
        from-[#f8fbff]
        via-[#eef6ff]
        to-[#e4f1ff]
      "
      id="timeline"
    >

      {/* BACKGROUND LIGHTS */}
      <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-cyan-300/20 rounded-full blur-[140px]"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[150px]"></div>

      {/* GRID */}
      {/* <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:55px_55px]"></div>
      </div> */}

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center mb-28"
        >

          {/* BADGE */}
          <div className="
            inline-flex
            items-center
            gap-3
            px-6
            py-3
            rounded-full
            bg-white/75
            backdrop-blur-2xl
            border border-white/60
            shadow-[0_10px_35px_rgba(15,23,42,0.08)]
            mb-8
          ">

            <div className="relative">

              <div className="absolute w-3 h-3 rounded-full bg-green-500 animate-ping"></div>

              <div className="relative w-3 h-3 rounded-full bg-green-500"></div>

            </div>

            <span className="text-sm font-bold tracking-wide text-slate-700">
              Patient Healthcare Journey
            </span>

          </div>

          {/* TITLE */}
          <h2
            className="
              text-4xl
              md:text-6xl
              font-black
              leading-[1.05]
              tracking-[-0.04em]
              mb-7
            "
          >

            <span  className="
                block mt-2
                bg-gradient-to-r
                from-blue-600
                via-sky-500
                to-cyan-400
                bg-clip-text
                text-transparent
              ">
               How Patients Use CareTrack
            </span>

            {/* <span
              className="
                block mt-2
                bg-gradient-to-r
                from-blue-600
                via-sky-500
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              Smart Healthcare Flow
            </span> */}

          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              max-w-3xl
              mx-auto
              text-slate-600
              text-lg
              md:text-xl
              leading-relaxed
            "
          >
            Follow a smooth healthcare experience that helps patients
            securely manage records, monitor vital signs, and receive
            personalized medical insights through one modern platform.
          </p>

        </motion.div>

        {/* TIMELINE */}
        <div className="relative">

          {/* CENTER LINE */}
          <div className="
            hidden md:block
            absolute
            left-1/2
            top-0
            -translate-x-1/2
            w-[5px]
            h-full
            rounded-full
            bg-gradient-to-b
            from-cyan-300
            via-blue-300
            to-sky-400
            opacity-50
          "></div>

          <div className="flex flex-col gap-20">

            {steps.map((step, i) => (

              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 60,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className={`
                  relative
                  flex
                  items-center
                  ${
                    i % 2 === 0
                      ? "md:justify-start"
                      : "md:justify-end"
                  }
                `}
              >

                {/* CARD */}
                <div className="relative w-full md:w-[46%] group">

                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-[34px]
                      border border-white/60
                      bg-white/70
                      backdrop-blur-[24px]
                      p-8
                      transition-all
                      duration-700
                      shadow-[0_15px_50px_rgba(15,23,42,0.06)]
                      hover:-translate-y-2
                      hover:scale-[1.015]
                      hover:shadow-[0_30px_80px_rgba(59,130,246,0.16)]
                    "
                  >

                    {/* GLOW */}
                    <div
                      className={`
                        absolute
                        -top-20
                        -right-20
                        w-56
                        h-56
                        rounded-full
                        blur-[110px]
                        opacity-30
                        transition-all
                        duration-700
                        group-hover:scale-125
                        ${step.glow}
                      `}
                    ></div>

                    {/* SHINE */}
                    <div className="
                      absolute
                      inset-0
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-700
                    ">

                      <div className="
                        absolute
                        top-0
                        -left-[120%]
                        w-[60%]
                        h-full
                        rotate-12
                        bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.45),transparent)]
                        group-hover:left-[150%]
                        transition-all
                        duration-[1500ms]
                      "></div>

                    </div>

                    {/* CONTENT */}
                    <div className="relative z-10 flex items-start gap-6">

                      {/* ICON */}
                      <div
                        className={`
                          relative
                          min-w-[78px]
                          h-[78px]
                          rounded-[26px]
                          flex
                          items-center
                          justify-center
                          text-white
                          bg-gradient-to-br
                          ${step.color}
                          shadow-[0_12px_30px_rgba(59,130,246,0.28)]
                          transition-all
                          duration-700
                          group-hover:scale-110
                          group-hover:rotate-3
                        `}
                      >

                        <div className="
                          absolute
                          inset-[1px]
                          rounded-[25px]
                          bg-white/10
                        "></div>

                        <div className="relative z-10">
                          {step.icon}
                        </div>

                      </div>

                      {/* TEXT */}
                      <div>

                        <div className="
                          inline-flex
                          items-center
                          px-4
                          py-1.5
                          rounded-full
                          bg-slate-100
                          text-[11px]
                          font-bold
                          tracking-[0.18em]
                          uppercase
                          text-slate-500
                          mb-4
                        ">
                          Step 0{i + 1}
                        </div>

                        <h3
                          className="
                            text-[26px]
                            font-black
                            tracking-[-0.04em]
                            text-slate-800
                            leading-tight
                            mb-4
                          "
                        >
                          {step.title}
                        </h3>

                        <p
                          className="
                            text-[15px]
                            leading-[1.9]
                            text-slate-500
                            font-medium
                          "
                        >
                          {step.desc}
                        </p>

                      </div>

                    </div>

                    {/* BOTTOM LINE */}
                    <div
                      className={`
                        absolute
                        left-8
                        bottom-0
                        h-[4px]
                        w-16
                        rounded-full
                        bg-gradient-to-r
                        ${step.color}
                        transition-all
                        duration-700
                        group-hover:w-32
                      `}
                    ></div>

                  </div>

                </div>

                {/* CENTER ICON */}
                <div
                  className={`
                    hidden
                    md:flex
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[92px]
                    h-[92px]
                    rounded-full
                    items-center
                    justify-center
                    text-white
                    bg-gradient-to-br
                    ${step.color}
                    border-[7px]
                    border-[#eef6ff]
                    shadow-[0_20px_45px_rgba(59,130,246,0.28)]
                    z-20
                  `}
                >

                  <div className="absolute inset-0 rounded-full bg-white/10"></div>

                  <div className="relative z-10">
                    {step.icon}
                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}