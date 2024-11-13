import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: ['About Us', 'Contact', 'Careers'],
    Resources: ['Blog', 'Recipes', 'Tips & Tricks'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  };

  const socialLinks = [
    { icon: '📱', label: 'Twitter', url: '#' },
    { icon: '📸', label: 'Instagram', url: '#' },
    { icon: '📘', label: 'Facebook', url: '#' },
    { icon: '💼', label: 'LinkedIn', url: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              BarBuddy
            </h3>
            <p className="text-sm text-gray-400">
              Your ultimate cocktail companion for perfect party planning and drink mixing.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4 text-white">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800 text-sm text-center">
          <p className="text-gray-400">
            &copy; {currentYear} BarBuddy. All rights reserved.
          </p>
          <p className="mt-2 text-gray-500">
            Made with 🍸 for cocktail enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
