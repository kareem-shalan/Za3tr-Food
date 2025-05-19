import React from 'react';
import { FaGithub, FaLinkedin, FaUniversity, FaCertificate } from 'react-icons/fa';
import { MdEmail, MdPhone, MdPerson } from 'react-icons/md';
import { motion } from 'framer-motion';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          {...fadeIn}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Kareem Mohamed Ali</h1>
          <h2 className="text-2xl text-primary font-semibold">Front-End Developer React'Js</h2>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
          {...fadeIn}
        >
          <a 
            href="mailto:kareemmohamedali330@gmail.com"
            className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors"
          >
            <MdEmail className="h-6 w-6" />
            <span>kareemmohamedali330@gmail.com</span>
          </a>
          <a 
            href="tel:+201272958197"
            className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors"
          >
            <MdPhone className="h-6 w-6" />
            <span>+20 127 295 8197</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/kareem-shalan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors"
          >
            <FaLinkedin className="h-6 w-6" />
            <span>LinkedIn Profile</span>
          </a>
          <a 
            href="https://github.com/kareem-shalan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors"
          >
            <FaGithub className="h-6 w-6" />
            <span>GitHub Profile</span>
          </a>
        </motion.div>

        {/* Professional Summary */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          {...fadeIn}
        >
          <div className="flex items-center space-x-3 mb-4">
            <MdPerson className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Professional Summary</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Skilled Front-End Developer with expertise in HTML, CSS, JavaScript, Bootstrap, and React. 
            Currently pursuing a Bachelor's in Business Information Systems at Tanta University. 
            Passionate about creating responsive, user-friendly applications and eager to learn new technologies. 
            Strong team player with excellent problem-solving and communication skills.
          </p>
        </motion.div>

        {/* Education */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          {...fadeIn}
        >
          <div className="flex items-center space-x-3 mb-4">
            <FaUniversity className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Education</h3>
          </div>
          <div className="ml-9">
            <h4 className="font-semibold text-gray-900">Bachelor's in Business Information Systems (BIS)</h4>
            <p className="text-gray-600">Faculty of Business, Tanta University</p>
            <p className="text-gray-500">2021-Present (Expected Graduation: 2026)</p>
          </div>
        </motion.div>

        {/* Certificates */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6"
          {...fadeIn}
        >
          <div className="flex items-center space-x-3 mb-4">
            <FaCertificate className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Certificates</h3>
          </div>
          <div className="space-y-4 ml-9">
            <div>
              <h4 className="font-semibold text-gray-900">Front-End Diploma</h4>
              <p className="text-gray-600">Route IT Training Center</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">English Course</h4>
              <p className="text-gray-600">American University in Cairo (AUC)</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">EST Certification</h4>
              <p className="text-gray-600">American University in Cairo (AUC)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 