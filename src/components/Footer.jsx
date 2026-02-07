import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="py-8 text-center bg-white/50 border-t border-gray-200 mt-20">
            <div className="flex items-center justify-center gap-2 text-lg font-heading text-gray-700">
                <span>Made with</span>
                <Heart className="pulse-heart" fill="currentColor" size={20} />
                <span>for Valentine's Day</span>
            </div>

            <div className="mt-4 text-sm text-gray-500">
                <a href="#" className="hover:text-red-500 transition-colors mx-2">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-red-500 transition-colors mx-2">Manage Preferences (Opt-out)</a>
            </div>
        </footer>
    );
};

export default Footer;
