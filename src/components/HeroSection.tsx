import React from "react";
import { ReactTyped } from "react-typed";
import { FaDownload } from "react-icons/fa";
import SocialIcons from "./SocialIcons";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-white px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12 px-4 md:px-8">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Abhishek Yadav
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            I'm a{" "}
            <span className="text-green-400">
              <ReactTyped
                strings={[
                  "Full Stack Developer",
                  "React.js Developer",
                  "Node.js Expert",
                  "Java Spring Boot Developer",
                ]}
                typeSpeed={40}
                backSpeed={50}
                loop
              />
            </span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
            Passionate full-stack developer with hands-on experience in modern
            web technologies. I love building clean and user-friendly
            applications that solve real-world problems.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
            <a
              href="#"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-3 rounded-full text-black font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
            >
              <FaDownload className="inline mr-2" />
              Download CV
            </a>
            <div className="flex gap-4 text-green-400 text-xl">
              <SocialIcons />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative md:w-1/2 flex items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute w-80 h-80 rounded-full border-2 border-green-400/30 animate-spin-slow"></div>
          
          {/* Middle rotating ring */}
          <div className="absolute w-72 h-72 rounded-full border border-green-500/50 animate-spin-reverse-slow"></div>

          {/* Profile image container */}
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-green-400/20 shadow-2xl shadow-green-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent z-10"></div>
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500"
              alt="Abhishek Yadav - Full Stack Developer"
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-0 w-1 h-1 bg-green-300 rounded-full animate-ping"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;