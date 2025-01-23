import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center py-4">
            <p className="text-sm">
                © {new Date().getFullYear()} Beer Hunter. All rights reserved.
            </p>
            <ul className="flex justify-center mt-2 space-x-4">
                <li>
                    <a
                        href="/about"
                        className="text-gray-400 hover:text-yellow-500 transition duration-300"
                    >
                        À propos de nous
                    </a>
                </li>
                <li>
                    <a
                        href="/contact"
                        className="text-gray-400 hover:text-yellow-500 transition duration-300"
                    >
                        Contact
                    </a>
                </li>
                <li>
                    <a
                        href="/privacy"
                        className="text-gray-400 hover:text-yellow-500 transition duration-300"
                    >
                        Politique de confidentialité
                    </a>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;