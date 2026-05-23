import {
  HeartPulse,
  ShieldCheck,
  Activity,
  Users,
  Stethoscope,
  Target,
} from "lucide-react";


import {
  User,
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Phone,
  Home,
  ArrowLeft,
} from "lucide-react";
export default function About() {
  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      

       <div className="fixed top-6 right-6 z-50">
              <button
                onClick={() => (window.location.href = "/")}
                className="
                  group
                  relative
                  flex
                  items-center
                  justify-center
                  w-16
                  h-16
                  rounded-2xl
                  bg-white/80
                  backdrop-blur-xl
                  border
                  border-blue-100
                  shadow-2xl
                  hover:scale-110
                  hover:-translate-y-1
                  transition-all
                  duration-500
                  overflow-hidden
                "
              >
                {/* Glow */}
                <div className="
                  absolute inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-all duration-500
                  bg-gradient-to-br
                  from-blue-400/20
                  via-cyan-300/20
                  to-blue-500/20
                " />
      
                {/* Ping Dot (always active) */}
                <div className="absolute top-2 right-2 w-2 h-2">
                  <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-60"></div>
                  <div className="relative w-full h-full rounded-full bg-cyan-500 shadow-md"></div>
                </div>
      
                {/* Icon + Arrow */}
                <div className="relative z-10 flex items-center gap-1 text-blue-700 group-hover:text-cyan-600 transition-all duration-500">
      
                  <ArrowLeft
                    size={14}
                    className="opacity-70 group-hover:-translate-x-1 transition-all duration-500"
                  />
      
                  <Home
                    size={30}
                    className="group-hover:rotate-12 transition-all duration-500"
                  />
                </div>
              </button>
            </div>










      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-6">
          About CareTrack
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          CareTrack is a smart healthcare management platform designed to help
          hospitals and clinics monitor patients, manage data, and respond to
          emergencies in real time with confidence and efficiency.
        </p>
      </section>

      {/* Why CareTrack */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Why CareTrack?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <HeartPulse className="text-red-500" size={36} />,
              title: "Real-Time Monitoring",
              text: "Track patient vital signs and receive instant alerts for critical cases.",
            },
            {
              icon: <Users className="text-blue-500" size={36} />,
              title: "Better Team Collaboration",
              text: "Doctors, nurses, and admins work together seamlessly on one platform.",
            },
            {
              icon: <Activity className="text-emerald-500" size={36} />,
              title: "Smarter Decisions",
              text: "Data-driven insights help medical staff take faster and safer actions.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Key Features
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            "Emergency case management and alerts",
            "Patient records and health history tracking",
            "Doctor and staff role management",
            "Secure access and data protection",
            "Analytics and performance insights",
            "Modern, responsive medical dashboard",
          ].map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white rounded-xl shadow p-5"
            >
              <Stethoscope className="text-blue-600 mt-1" />
              <p className="text-gray-700">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 mb-20 grid md:grid-cols-2 gap-10">
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-blue-600" />
            <h3 className="text-2xl font-bold">Our Mission</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To improve healthcare quality by providing smart digital tools that
            support medical teams, reduce response time, and enhance patient
            safety.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-emerald-500" />
            <h3 className="text-2xl font-bold">Our Vision</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To become a trusted healthcare technology solution used globally
            for smarter, safer, and more connected medical systems.
          </p>
        </div>

      </section>

      {/* Trust Section */}
      <section className="bg-blue-600 py-16 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Trusted Medical Technology
        </h2>
        <p className="max-w-2xl mx-auto text-blue-100">
          CareTrack follows modern healthcare standards to ensure data privacy,
          system reliability, and ease of use for medical professionals.
        </p>
      </section>
    </div>
  );
}
  

// 222222222222222222222222222222222222222222222222222222
