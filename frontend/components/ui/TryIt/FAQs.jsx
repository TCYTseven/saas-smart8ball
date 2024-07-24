import { useState, useEffect } from 'react';
import LayoutEffect from "@/components/LayoutEffect";
import SectionWrapper from "@/components/SectionWrapper";
import Brand from "../Brand"; // Importing Brand for additional styling

const TryIt = () => {
    const [fileName, setFileName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showAccountPopup, setShowAccountPopup] = useState(false); // New state for account creation popup

    const handleFileUpload = (event) => {
        if (event.target.files.length > 0) {
            setFileName(`File "${event.target.files[0].name}" uploaded successfully.`);
            setShowPopup(true);
        }
    };

    useEffect(() => {
        if (showPopup || showAccountPopup) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'unset'; // Enable scrolling
        }

        return () => {
            document.body.style.overflow = 'unset'; // Re-enable scrolling when component unmounts
        };
    }, [showPopup, showAccountPopup]);

    const handleGetAnswer = () => {
        setShowAccountPopup(true); // Show the account creation popup when button is pressed
    };

    const handleClosePopup = () => {
        setShowAccountPopup(false); // Close the account creation popup
    };

    return (
        <SectionWrapper id="faqs">
            <div className="custom-screen flex justify-center items-center -mt-20">
                <div className="bg-gray-900 text-gray-300 rounded-lg p-4 w-4/5 max-w-7xl border-4 border-white drop-shadow-[0_20px_25px_rgba(128,90,213,0.7)] transition-all duration-300 hover:scale-105">
                    <div className="max-w-2xl mx-auto text-center xl:mx-auto">
                        <h2 className="text-gray-50 text-4xl font-extrabold sm:text-5xl whitespace-nowrap overflow-hidden overflow-ellipsis">
                            Try It Now
                        </h2>
                        <p className="mt-4 text-lg">
                            Don't have a hard decision to make? Man, you're lucky.
                        </p>
                    </div>
                    <div className="mt-6 relative">
                        <textarea
                            className="w-full h-80 p-4 border border-gray-700 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Ask anything..."
                        />
                        <label className="absolute bottom-4 left-4 bg-gray-700 text-gray-300 font-bold py-2 px-3 rounded-lg cursor-pointer text-sm">
                            Attach Context
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </label>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            className="focus:outline-none bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-300"
                            onClick={handleGetAnswer}
                        >
                            Get Answer
                        </button>
                    </div>
                </div>
            </div>
            {showAccountPopup && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white py-4 px-6 rounded-lg shadow-lg text-center">
                        <Brand />
                        <p className="mt-4">Please create an account to get your answer.</p>
                        <div className="mt-4">
                            <button className="bg-green-600 py-2 px-4 rounded mr-2" onClick={() => window.location.href = '/signup'}>
                                Sign Up
                            </button>
                            <button className="bg-purple-600 py-2 px-4 rounded" onClick={() => window.location.href = '/register'}>
                                Register
                            </button>
                        </div>
                        <button className="mt-4 bg-red-500 py-2 px-4 rounded text-white" onClick={handleClosePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </SectionWrapper>
    );
};

export default TryIt;
