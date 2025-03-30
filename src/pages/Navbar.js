import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AppContext';

const NavLinks = [
    { name: "Home", path: "/" },
    // { name: "Find a Hospital", path: "/showHospitals" },
];

const Navbar = () => {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAppContext();
    // Check if a user token exists in local storage
    const userToken = localStorage.getItem("token");

    // Fetch user role from localStorage when component mounts or userToken changes
 

    const handleLogout = () => {
        // Clear stored user data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/');
        
        window.location.reload();

    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Function to render role-specific button
    const renderRoleButton = (mobile = false) => {

        let buttonConfig = {
            text: "",
            path: "",
            bgColor: ""
        };


        console.log("Button config:", buttonConfig);

        // Return button with appropriate styling for mobile or desktop
        if (mobile) {
            return (
                <Link
                    to={buttonConfig.path}
                    className={`text-[#4c5270] font-semibold py-2 px-3 rounded-md ${buttonConfig.bgColor} hover:bg-[#4c5270] hover:text-white transition`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    {buttonConfig.text}
                </Link>
            );
        } else {
            return (
                <div className={`${buttonConfig.bgColor} px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-[#4c5270] hover:text-white`}>
                    <Link
                        to={buttonConfig.path}
                        className="text-[#4c5270] font-semibold tracking-wide hover:text-white"
                    >
                        {buttonConfig.text}
                    </Link>
                </div>
            );
        }
    };

    // Debug test button - always shows regardless of role to verify rendering
    const testButton = (mobile = false) => {
        if (mobile) {
            return (
                <Link
                    to="/test"
                    className="text-[#4c5270] font-semibold py-2 px-3 rounded-md bg-[#36eee0] hover:bg-[#4c5270] hover:text-white transition"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Test Button
                </Link>
            );
        } else {
            return (
                <div className="bg-[#36eee0] px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-[#4c5270] hover:text-white">
                    <Link
                        to="/test"
                        className="text-[#4c5270] font-semibold tracking-wide hover:text-white"
                    >
                        Test Button
                    </Link>
                </div>
            );
        }
    };

    return (
        <>
            {/* Announcement Bar */}
            <div className="w-full bg-[#4c5270] text-white py-2 text-center text-sm font-semibold">
                Get an expert second opinion from India's leading specialists.
            </div>

            {/* Main Navbar */}
            <div className="bg-[#bcece0] px-4 md:px-12 py-4 flex justify-between items-center shadow-lg">
                <Link to="/" className="flex items-center space-x-3">
                    <div className="text-[#4c5270]">
                        <div className="font-bold text-2xl">HOSPITAL</div>
                        <div className="text-xs">Your Health, Our Priority</div>
                    </div>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-[#4c5270] p-2"
                    onClick={toggleMenu}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-4">
                    {NavLinks.map((link, index) => (
                        <div key={index} className="bg-[#36eee0] px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-[#4c5270] hover:text-white">
                            <Link
                                to={link.path}
                                className="text-[#4c5270] font-semibold tracking-wide hover:text-white"
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))}

                    <div>
                        {
                            user && (

                                <Link to={`/${user?.role}`}>
                                    {user?.role}
                                </Link>

                            )
                        }
                    </div>

                    {/* Render role-specific button if user is logged in and has a role */}

                    {/* Show Logout if token exists, Login if it doesn't */}
                    {userToken ? (
                        <div
                            className="bg-[#f652a0] px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 hover:opacity-90 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <span className="text-white font-semibold tracking-wide">
                                Logout
                            </span>
                        </div>
                    ) : (
                        <div className="bg-[#4c5270] px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 hover:opacity-90">
                            <Link
                                to="/login"
                                className="text-white font-semibold tracking-wide"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu (Slide Down) */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#bcece0] py-2 px-4 shadow-lg">
                    <div className="flex flex-col space-y-3">
                        {NavLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path}
                                className="text-[#4c5270] font-semibold py-2 px-3 rounded-md bg-[#36eee0] hover:bg-[#4c5270] hover:text-white transition"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Render role-specific button for mobile if user is logged in and has a role */}

                        {/* Login/Logout Button for Mobile */}
                        {userToken ? (
                            <button
                                className="text-white font-semibold py-2 px-3 rounded-md bg-[#f652a0] hover:opacity-90 transition"
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="text-white font-semibold py-2 px-3 rounded-md bg-[#4c5270] hover:opacity-90 transition"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;