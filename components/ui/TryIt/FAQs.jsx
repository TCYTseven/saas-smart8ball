import { useState, useEffect } from 'react';
import LayoutEffect from "@/components/LayoutEffect";
import SectionWrapper from "@/components/SectionWrapper";

const TryIt = () => {
    const [fileName, setFileName] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleFileUpload = (event) => {
        if (event.target.files.length > 0) {
            setFileName(`File "${event.target.files[0].name}" uploaded successfully.`);
            setShowPopup(true);
        }
    };

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000); // Hide popup after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [showPopup]);

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
                        <button className="focus:outline-none bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-300">
                            Get Answer
                        </button>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg flex items-center shadow-lg">
                    <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                    {fileName}
                </div>
            )}
        </SectionWrapper>
    );
};

export default TryIt;
