// /* eslint-disable no-unused-vars */


// // **************************************************************************

// import React, { useRef, useState } from "react";

// import { useNavigate } from "react-router-dom";
// import emailjs from "@emailjs/browser";
// import toast, { Toaster } from "react-hot-toast";

// import {
//   User,
//   Mail,
//   MessageSquare,
//   Send,
//   MapPin,
//   Phone,
//   Home,
//   ArrowLeft,
// } from "lucide-react";

// export default function Contact() {
//   const form = useRef();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);

//   const sendEmail = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     try {
//       await emailjs.sendForm(
//         "service_fcnb998",
//         "template_8ng0b6n",
//         form.current,
//         "Pdcde4Urylg21eFK1",
//       );

//       toast.success("Message sent successfully!");

//       form.current.reset();
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       toast.error("Failed to send message");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-28 pb-16 px-6 md:px-12">
//       {/* Toast */}
//       <Toaster
//   position="bottom-right"
//   reverseOrder={false}
//   toastOptions={{
//     duration: 4000,

//     style: {
//       background: "rgba(255,255,255,0.85)",
//       color: "#1e3a8a",
//       backdropFilter: "blur(14px)",
//       border: "1px solid rgba(191,219,254,0.7)",
//       borderRadius: "20px",
//       padding: "16px 18px",
//       fontSize: "15px",
//       fontWeight: "600",
//       boxShadow: "0 20px 50px rgba(59,130,246,0.15)",
//     },

//     success: {
//       iconTheme: {
//         primary: "#2563eb",
//         secondary: "#ffffff",
//       },

//       style: {
//         border: "1px solid #bfdbfe",
//       },
//     },

//     error: {
//       iconTheme: {
//         primary: "#ef4444",
//         secondary: "#ffffff",
//       },

//       style: {
//         border: "1px solid #fecaca",
//         color: "#991b1b",
//       },
//     },
//   }}
// />













//       <div className="fixed top-6 right-6 z-50">
//         <button
//           onClick={() => navigate(-1)}
//           className="
//             group
//             relative
//             flex
//             items-center
//             justify-center
//             w-16
//             h-16
//             rounded-2xl
//             bg-white/80
//             backdrop-blur-xl
//             border
//             border-blue-100
//             shadow-2xl
//             hover:scale-110
//             hover:-translate-y-1
//             transition-all
//             duration-500
//             overflow-hidden
//           "
//         >
//           {/* Glow */}
//           <div className="
//             absolute inset-0
//             opacity-0
//             group-hover:opacity-100
//             transition-all duration-500
//             bg-gradient-to-br
//             from-blue-400/20
//             via-cyan-300/20
//             to-blue-500/20
//           " />

//           {/* Ping Dot (always active) */}
//           <div className="absolute top-2 right-2 w-2 h-2">
//             <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-60"></div>
//             <div className="relative w-full h-full rounded-full bg-cyan-500 shadow-md"></div>
//           </div>

//           {/* Icon + Arrow */}
//           <div className="relative z-10 flex items-center gap-1 text-blue-700 group-hover:text-cyan-600 transition-all duration-500">

//             <ArrowLeft
//               size={14}
//               className="opacity-70 group-hover:-translate-x-1 transition-all duration-500"
//             />

//             <Home
//               size={30}
//               className="group-hover:rotate-12 transition-all duration-500"
//             />
//           </div>
//         </button>
//       </div>

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold mb-5 shadow-sm">
//             Care Track Support
//           </div>

//           <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-5 leading-tight">
//             Contact Us
//           </h1>

//           <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
//             Need assistance with patients, appointments, or system support? Our
//             team is always ready to help you.
//           </p>
//         </div>

//         {/* Main Grid */}
//         <div className="grid lg:grid-cols-2 gap-10 items-stretch">
//           {/* Left Side */}
//           <div className="space-y-8">
//             {/* Map */}
//             <div className="overflow-hidden rounded-3xl shadow-2xl border border-blue-200 h-[500px]">
//               <iframe
//                 src="https://www.google.com/maps?q=London&output=embed"
//                 width="100%"
//                 height="100%"
//                 loading="lazy"
//                 className="w-full h-full"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="location"
//               ></iframe>
//             </div>

//             {/* Contact Cards */}
//             <div className="grid sm:grid-cols-2 gap-5">
//               {/* Email */}
//               <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
//                 <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
//                   <Mail className="text-blue-700" />
//                 </div>

//                 <h3 className="font-bold text-lg text-gray-800 mb-2">
//                   Email Support
//                 </h3>

//                 <p className="text-gray-600 text-sm">zleaitnhakas0@gmail.com</p>
//               </div>

//               {/* Phone */}
//               <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
//                 <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
//                   <Phone className="text-blue-700" />
//                 </div>

//                 <h3 className="font-bold text-lg text-gray-800 mb-2">
//                   Phone Number
//                 </h3>

//                 <p className="text-gray-600 text-sm">+44 7700 900123</p>
//               </div>
//             </div>

//             {/* Address */}
//             <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
//                   <MapPin className="text-blue-700" />
//                 </div>

//                 <div>
//                   <h3 className="font-bold text-lg text-gray-800 mb-2">
//                     Hospital Location
//                   </h3>

//                   <p className="text-gray-600 leading-relaxed">
//                     Care Track Medical Center <br />
//                     London, United Kingdom
//                   </p>
//                 </div>
//               </div>
//             </div>

//           </div>

//           {/* Right Side Form */}
//           <div className="bg-white border border-blue-100 rounded-3xl shadow-2xl p-8 md:p-10">
//             <h2 className="text-3xl font-bold text-blue-800 mb-2">
//               Send a Message
//             </h2>

//             <p className="text-gray-500 mb-8">
//               Fill in the form below and our team will contact you shortly.
//             </p>

//             <form ref={form} onSubmit={sendEmail} className="space-y-6">
//               {/* Name */}
//               <div>
//                 <label className="block mb-2 text-gray-700 font-medium">
//                   Full Name
//                 </label>

//                 <div className="relative">
//                   <User
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
//                     size={20}
//                   />

//                   <input
//                     type="text"
//                     name="user_name"
//                     required
//                     placeholder="Enter your full name"
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block mb-2 text-gray-700 font-medium">
//                   Email Address
//                 </label>

//                 <div className="relative">
//                   <Mail
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
//                     size={20}
//                   />

//                   <input
//                     type="email"
//                     name="user_email"
//                     required
//                     placeholder="you@example.com"
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Message */}
//               <div>
//                 <label className="block mb-2 text-gray-700 font-medium">
//                   Message
//                 </label>

//                 <div className="relative">
//                   <MessageSquare
//                     className="absolute left-4 top-4 text-blue-500"
//                     size={20}
//                   />

//                   <textarea
//                     rows="7"
//                     name="message"
//                     required
//                     placeholder="Write your message here..."
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
//                   ></textarea>
//                 </div>
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     <Send size={20} />
//                     Send Message
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// // 222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222




// ******************************************************************
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { User, Mail, MessageSquare, Send, MapPin, Phone, Home, ArrowLeft } from "lucide-react";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        "service_fcnb998",
        "template_8ng0b6n",
        form.current,
        "Pdcde4Urylg21eFK1"
      );

      toast.success("Message sent successfully!");
      form.current.reset();
    } catch {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fbff] via-white to-[#eef7ff] pt-28 pb-16 px-6">

    <Toaster
  position="bottom-right"
  reverseOrder={false}
  gutter={12}
  toastOptions={{
    duration: 3500,
    style: {
      background: "rgba(255,255,255,0.9)",
      color: "#0f172a",
      padding: "14px 18px",
      borderRadius: "16px",
      border: "1px solid rgba(59,130,246,0.15)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      backdropFilter: "blur(12px)",
      fontWeight: 500,
    },
    success: {
      style: {
        border: "1px solid rgba(34,197,94,0.25)",
      },
      iconTheme: {
        primary: "#16a34a",
        secondary: "#ffffff",
      },
    },
    error: {
      style: {
        border: "1px solid rgba(239,68,68,0.25)",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#ffffff",
      },
    },
  }}
/>

      {/* BACK BUTTON */}
       <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => navigate(-1)}
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






      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-semibold border border-sky-100">
            CareTrack Medical Support
          </span>

          <h1 className="text-4xl md:text-5xl font-black mt-4 bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Contact Clinical Team
          </h1>

          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Secure communication channel for medical support, patient inquiries, and system assistance.
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT INFO */}
          <div className="space-y-5">

            {/* MAP */}
            <div className="rounded-3xl overflow-hidden border border-sky-100 shadow-sm h-[320px] bg-white/60 backdrop-blur-xl">
              <iframe
                src="https://www.google.com/maps?q=London&output=embed"
                className="w-full h-full"
                title="location"
              />
            </div>

            {/* INFO CARDS */}
            <div className="grid sm:grid-cols-2 gap-4">

              <div className="bg-white/60 backdrop-blur-xl border border-sky-100 rounded-2xl p-5">
                <Mail className="text-sky-600 mb-3" />
                <p className="text-sm font-semibold text-slate-700">Email</p>
                <p className="text-xs text-slate-500">zleaitnhakas0@gmail.com</p>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-sky-100 rounded-2xl p-5">
                <Phone className="text-sky-600 mb-3" />
                <p className="text-sm font-semibold text-slate-700">Phone</p>
                <p className="text-xs text-slate-500">+44 7700 900123</p>
              </div>

            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-sky-100 rounded-2xl p-5 flex gap-4">
              <MapPin className="text-sky-600 mt-1" />
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  CareTrack Medical Center
                </p>
                <p className="text-xs text-slate-500">
                  London, United Kingdom
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="bg-white/70 backdrop-blur-2xl border border-sky-100 rounded-3xl p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Send Message
            </h2>

            <p className="text-sm text-slate-500 mb-6">
              We respond within 24 hours for clinical inquiries.
            </p>

            <form ref={form} onSubmit={sendEmail} className="space-y-5">

              {/* NAME */}
              <div>
                <p className="text-xs text-slate-500 mb-1">Full Name</p>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sky-50 border border-sky-100">
                  <User size={18} className="text-sky-600" />
                  <input
                    name="user_name"
                    required
                    placeholder="Enter your name"
                    className="bg-transparent w-full outline-none text-sm"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sky-50 border border-sky-100">
                  <Mail size={18} className="text-sky-600" />
                  <input
                    name="user_email"
                    required
                    placeholder="you@example.com"
                    className="bg-transparent w-full outline-none text-sm"
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <p className="text-xs text-slate-500 mb-1">Message</p>
                <div className="flex gap-3 px-4 py-3 rounded-xl bg-sky-50 border border-sky-100">
                  <MessageSquare size={18} className="text-sky-600 mt-1" />
                  <textarea
                    name="message"
                    rows="5"
                    required
                    placeholder="Write your message..."
                    className="bg-transparent w-full outline-none text-sm resize-none"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 text-white font-semibold shadow-md hover:shadow-lg transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
