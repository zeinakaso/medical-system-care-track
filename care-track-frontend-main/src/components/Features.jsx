// MUI Components
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import {
  HealthAndSafety,
  MonitorHeart,
  Groups,
  EventAvailable,
} from "@mui/icons-material";

export default function Features() {
  const features = [
    {
      title: "Medical Records",
      desc: "Track and access your full medical history in a secure, organized dashboard.",
      icon: <HealthAndSafety sx={{ fontSize: 60, color: "#0d5f8a" }} />,
    },
    {
      title: "Smart Monitoring",
      desc: "Monitor symptoms, vitals, and medications with intelligent reminders.",
      icon: <MonitorHeart sx={{ fontSize: 60, color: "#0d5f8a" }} />,
    },
    {
      title: "Doctor Connection",
      desc: "Stay connected with your doctors through instant updates and communication.",
      icon: <Groups sx={{ fontSize: 60, color: "#0d5f8a" }} />,
    },
    {
      title: "Appointments",
      desc: "Manage appointments easily with automated follow-ups and reminders.",
      icon: <EventAvailable sx={{ fontSize: 60, color: "#0d5f8a" }} />,
    },
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-[#e1f3ff]">

      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0d5f8a] mb-4">
          What Our System Provides
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          A modern digital healthcare system designed to simplify your journey,
          enhance communication, and keep you in control of your health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-8 md:px-20">
        {features.map((f, index) => (
          <Card
            key={index}
            className="shadow-xl rounded-3xl hover:scale-105 transition-all duration-300"
            sx={{
              borderRadius: "26px",
              paddingTop: "20px",
              background: "white",
            }}
          >
            <div className="flex justify-center">{f.icon}</div>

            <CardContent>
              <Typography
                variant="h5"
                className="text-center font-bold text-[#0d5f8a] mb-2"
              >
                {f.title}
              </Typography>

              <Typography
                variant="body2"
                className="text-center text-gray-600 leading-relaxed"
              >
                {f.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
