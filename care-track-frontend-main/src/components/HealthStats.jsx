
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpacityIcon from "@mui/icons-material/Opacity";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";

const stats = [
  { id: 1, label: "Heart Rate", icon: <FavoriteIcon fontSize="large" />, target: 78, unit: "bpm" },
  { id: 2, label: "Oxygen Level", icon: <OpacityIcon fontSize="large" />, target: 97, unit: "%" },
  { id: 3, label: "Temperature", icon: <DeviceThermostatIcon fontSize="large" />, target: 36.6, unit: "°C" },
  { id: 4, label: "Blood Pressure", icon: <BloodtypeIcon fontSize="large" />, target: 120, unit: "mmHg" },
];

export default function HealthStats() {
  // التخزين للأرقام المتحركة
  const [values, setValues] = useState(stats.map(() => 0));

  // عدّاد Animated Counter
  useEffect(() => {
    const intervals = stats.map((item, index) => {
      let current = 0;

      return setInterval(() => {
        current += item.target / 50;
        if (current >= item.target) current = item.target;

        setValues((prev) => {
          const updated = [...prev];
          updated[index] = Number(current.toFixed(1));
          return updated;
        });
      }, 40);
    });

    return () => intervals.forEach((i) => clearInterval(i));
  }, []);

  return (
    <div
      style={{
        padding: "60px 20px",
        background: "linear-gradient(to bottom, #e8f1ff, #f6f9ff)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* خلفية ECG */}
      <div
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 200 C150 100 350 300 500 200 C650 100 750 300 900 200' stroke='%230a3d62' stroke-width='3' fill='none' opacity='0.08'/%3E%3C/svg%3E")`,
    backgroundRepeat: "repeat-x",
    backgroundSize: "cover",
    opacity: 0.2,
  }}
></div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "36px", color: "#0a3d62", marginBottom: "10px" }}>
          Health Stats Live
        </h2>
        <p style={{ fontSize: "18px", color: "#555" }}>
          Real-time vital signs with animated dynamic counters
        </p>
      </div>

      {/* البطاقات */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          show: { transition: { staggerChildren: 0.25 } },
        }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card
              elevation={3}
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: "20px",
                background: "white",
              }}
            >
              <CardContent>
                <div style={{ color: "#1e88e5", marginBottom: "10px" }}>{stat.icon}</div>

                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {stat.label}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{ color: "#0a3d62", marginTop: "10px", fontWeight: "bold" }}
                >
                  {values[index]} {stat.unit}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
