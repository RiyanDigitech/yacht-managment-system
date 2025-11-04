import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Image12 from '../../public/image 12.png'

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#021426] text-gray-200 text-center py-8 px-6 md:px-16">
      <div className="flex flex-col items-center gap-6">
        <img 
          src={Image12}
          alt="Smart Choice Logo"
          className="w-38 md:w-40 lg:w-44"
        />

        <div>
          <p className="text-[#FFFFFF] text-[15px] fonts-Roboto">
            Email:{" "}
            <a
              href="mailto:Info@smartchoiceyachts.com"
              className="text-[#FFFFFF] hover:text-white transition underline"
            >
              Info@smartchoiceyachts.com
            </a>
          </p>
          <p className="text-[#FFFFFF] text-[15px] fonts-Roboto ">
            Phone:{" "}
            <a
              href="tel:+971522757000"
              className="text-[#FFFFFF] hover:text-white transition underline"
            >
              +971522757000
            </a>
            {" "},{" "}
            <a
              href="tel:+971589552731"
              className="text-[#FFFFFF] hover:text-white transition underline"
            >
              +971589552731
            </a>
          </p>
          <p className="text-[#FFFFFF] text-[15px] fonts-Roboto">Address: Attar Business Centre Al Barsha Dubai</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 pt-4 text-sm text-white w-full gap-3 md:gap-0">
        <p className="text-center md:text-left flex-1 fonts-Inconsolata">
          © 2025 Smart Choice Yachts. All rights reserved.
        </p>

        <div className="flex justify-center items-center gap-4 text-lg flex-1">
          <a href="#" className="hover:text-gray-300 transition-colors">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            <FaLinkedinIn />
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            <FaInstagram />
          </a>
        </div>

        <p className="text-center md:text-right flex-1 fonts-Inconsolata">
          Powered By:{" "}
          <span className="font-medium hover:text-gray-300 transition-colors">
            <Link
              to="https://www.digitechinfra.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digitechinfra
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
