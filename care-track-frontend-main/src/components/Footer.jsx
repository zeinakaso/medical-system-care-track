import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import caretrack from "../assets/caretrack.png";

export default function Footer() {

 
  return (
    <footer
      className="
         
        mt-30
         bottom-0 left-0 w-full
        bg-white
        shadow-[0_-2px_15px_rgba(0,0,0,0.08)]
        border-t border-blue-100
        py-12 px-6
        z-50
      "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* logo + description */}
        <div>
           <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-blue-400 to-teal-300 shadow-lg">
  <div className="w-full h-full rounded-full overflow-hidden bg-white">
    <img src={caretrack} alt="logo" className="w-full h-full object-cover" />
  </div>
</div>
          <p className="text-gray-600 leading-relaxed">
            Smart Medical Monitoring System that helps patients track their health
            and connect with doctors easily.
          </p>
        </div>

        {/* Column 1 */}
        <div>
          <h3 className="text-blue-700 font-semibold text-lg mb-3">Navigation</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">Services</a></li>
            <li><a href="#" className="hover:text-blue-600">About</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-blue-700 font-semibold text-lg mb-3">Medical Tools</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-blue-600">Heart Monitor</a></li>
            <li><a href="#" className="hover:text-blue-600">Blood Pressure</a></li>
            <li><a href="#" className="hover:text-blue-600">Temperature</a></li>
            <li><a href="#" className="hover:text-blue-600">Body Oxygen</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-blue-700 font-semibold text-lg mb-3">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-600">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms of Use</a></li>
          </ul>
        </div>
      </div>

      <hr className="my-10 border-blue-100" />

      {/* bottom bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600">
          © {new Date().getFullYear()} CareTrack — All Rights Reserved
        </p>

        <div className="flex gap-5 text-blue-700">
          <Facebook className="cursor-pointer hover:text-blue-900" />
          <Instagram className="cursor-pointer hover:text-blue-900" />
          <Twitter className="cursor-pointer hover:text-blue-900" />
          <Mail className="cursor-pointer hover:text-blue-900" />
        </div>
      </div>


      
    </footer>
  );
}
