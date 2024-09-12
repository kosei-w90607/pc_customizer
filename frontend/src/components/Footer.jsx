import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-100 shadow-inner py-16 mt-8 relative">
      <div className="absolute top-0 left-0 w-full border-t-2 border-black"></div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center pt-2 space-y-4 md:space-y-0 px-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
          <a href="/contact" className="text-lg">お問合せ</a>
          <a href="/terms" className="text-lg">利用規約</a>
          <a href="/policy" className="text-lg">サイトポリシー</a>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-lg">
            <FaInstagram size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-lg">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-lg">
            <FaFacebook size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
