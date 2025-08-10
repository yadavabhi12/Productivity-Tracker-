import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="flex gap-4">
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-300 hover:scale-110 transform"
      >
        <FaLinkedin size={24} />
      </a>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-300 hover:scale-110 transform"
      >
        <FaGithub size={24} />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-300 hover:scale-110 transform"
      >
        <FaTwitter size={24} />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-300 hover:scale-110 transform"
      >
        <FaInstagram size={24} />
      </a>
    </div>
  );
};

export default SocialIcons;