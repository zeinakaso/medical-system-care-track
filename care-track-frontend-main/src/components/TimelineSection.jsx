/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  LogIn,
  UploadCloud,
  Activity,
  MessagesSquare,
  HeartPulse,
} from "lucide-react";

export default function TimelineSection() {
  const steps = [
    {
      icon: <LogIn size={36} />,
      title: "Login to Your Account",
      desc: "Secure access to your personal health dashboard.",
    },
    {
      icon: <UploadCloud size={36} />,
      title: "Upload Medical Records",
      desc: "Easily add your reports, scans, and prescriptions.",
    },
    {
      icon: <Activity size={36} />,
      title: "Track Your Condition",
      desc: "Live monitoring of vitals and health indicators.",
    },
    {
      icon: <MessagesSquare size={36} />,
      title: "Chat With Your Doctor",
      desc: "Instant communication with healthcare professionals.",
    },
    {
      icon: <HeartPulse size={36} />,
      title: "Receive Recommendations",
      desc: "Personalized care suggestions based on your data.",
    },
  ];

  return (
    <section className="w-full py-24 bg-white" id="timeline">
      <div className="container mx-auto px-6 text-center">

        <h2 className="text-5xl font-extrabold text-blue-700 tracking-tight mb-4">
          How Patients Use CareTrack
        </h2>

        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full mx-auto mb-16"></div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 md:left-1/2 h-full border-l-4 border-blue-200"></div>

          <div className="flex flex-col gap-20">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >

                {/* 🔵 أيقونة ناعمة وجذابة */}
                <div
                  className="
                    w-20 h-20 rounded-full flex items-center justify-center
                    bg-gradient-to-br from-blue-500 to-blue-700
                    text-white shadow-xl absolute
                    left-0 md:left-1/2 md:-translate-x-1/2
                    ring-4 ring-blue-100
                  "
                  style={{
                    top: "-30px",
                    boxShadow: "0 0 18px rgba(30, 144, 255, 0.45)",
                    transform: "translateY(-10px)",
                  }}
                >
                  {step.icon}
                </div>

                {/* الكارد */}
                <div
                  className="
                    bg-white shadow-lg p-6 rounded-2xl border border-blue-100
                    w-full md:w-1/2 mx-auto pt-14
                  "
                >
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
