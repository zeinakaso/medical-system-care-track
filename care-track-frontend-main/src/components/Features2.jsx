import { Card, CardContent, Typography } from "@mui/material";
import HealingIcon from "@mui/icons-material/Healing";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useEffect } from "react";

export default function Features2() {
  const features = [
    {
      title: "Real-Time Patient Monitoring",
      desc: "CareTrack continuously observes vital signs and updates medical data instantly for safer decisions.",
      icon: <MonitorHeartIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Smart Medical Records",
      desc: "Automatically organized medical files accessible securely to doctors, nurses, and patients.",
      icon: <HealingIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Seamless Communication",
      desc: "Direct messaging channels between medical staff and patients for fast and effective care.",
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "AI Health Predictions",
      desc: "AI-powered suggestions based on patient data to detect issues before they appear.",
      icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Smart Appointment Scheduling",
      desc: "Organize and manage medical appointments with automated reminders.",
      icon: <EventAvailableIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Secure Cloud Storage",
      desc: "Encrypted storage for all medical records for maximum safety and availability.",
      icon: <CloudDoneIcon sx={{ fontSize: 40 }} />,
    }
  ];

  // ⭐ Apply fade + slide + stagger
  useEffect(() => {
    const cards = document.querySelectorAll(".fade-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // assign stagger delay based on card index
            entry.target.style.transitionDelay = entry.target.dataset.delay + "ms";
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
  }, []);

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-blue-50" id="features">
      <div className="container mx-auto px-6 text-center">

        <h2 className="text-5xl font-extrabold text-blue-700 mb-4 tracking-tight">
          Powerful Features
        </h2>

        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full mx-auto mb-14"></div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <Card
              key={i}
              data-delay={i * 120}   // ⭐ Stagger: 120ms between each card
              className="
                fade-card opacity-0 translate-y-10 
                transition-all duration-700 
                rounded-3xl hover:-translate-y-3 
                hover:shadow-blue-200 shadow-xl 
                backdrop-blur-lg bg-white/60 border border-blue-100
              "
              sx={{
                borderRadius: "26px",
                padding: "20px",
              }}
            >
              <CardContent>

                {/* Icon Circle */}
                <div className="flex justify-center mb-6">
                  <div className="
                    w-20 h-20 flex items-center justify-center rounded-full 
                    bg-gradient-to-br from-blue-100 to-blue-300
                    shadow-inner shadow-blue-200 
                    text-blue-700
                  ">
                    {f.icon}
                  </div>
                </div>

                <Typography
                  variant="h6"
                  className="text-blue-800 font-bold mb-3 tracking-wide"
                >
                  {f.title}
                </Typography>

                <Typography
                  variant="body2"
                  className="text-gray-600 leading-relaxed px-3"
                >
                  {f.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          .fade-card.show {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}
      </style>
    </section>
  );
}
