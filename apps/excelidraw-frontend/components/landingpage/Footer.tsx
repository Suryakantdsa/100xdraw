import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">100xdraw</h3>
            <p className="text-slate-300">
              Unleash your creativity with our intuitive whiteboard tool.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-blue-600 transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-pink-600 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-blue-700 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-gray-500 transition-colors"
              >
                <Github size={24} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-blue-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-blue-600 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-blue-600 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-blue-600 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-blue-600 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-blue-600 transition-colors"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-blue-600 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-blue-600 transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-slate-300">
                Email: suryakantdasbabuni@gmail.com
              </li>
              <li className="text-slate-300">Phone: +91 7504725674</li>
              <li className="text-slate-300">
                Address: plot no 100 Surya vallly , jaydev vihar , Bhubaneswer
                751013
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-slate-300">
            &copy; {new Date().getFullYear()} 100xdraw. All rights reserved.
          </p>
          <p className="mt-1"> Made with ❤ by Suryakant</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
