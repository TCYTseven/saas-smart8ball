import { useState, useEffect } from 'react';
import SectionWrapper from "@/components/SectionWrapper";
import Brand from "@/components/ui/Brand";
import { supabase } from '@/supabaseclient';
import { FaInfoCircle } from 'react-icons/fa'; // Import the info icon

const AppPage = () => {
    const [fileName, setFileName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showAccountPopup, setShowAccountPopup] = useState(false);
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState('ITMP'); // Default personality
    const [personaFromSupabase, setPersonaFromSupabase] = useState('');

    const handleFileUpload = (event) => {
        if (event.target.files.length > 0) {
            setFileName(`File "${event.target.files[0].name}" uploaded successfully.`);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000); 
        }
    };

    useEffect(() => {
        if (showAccountPopup) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'unset'; 
        }

        return () => {
            document.body.style.overflow = 'unset'; 
        };
    }, [showAccountPopup]);

    useEffect(() => {
        const fetchPersona = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const { data, error } = await supabase
                .from('profiles')
                .select('personality')
                .eq('id', user?.id)
                .single();
            if (error) {
                console.error('Error fetching persona from Supabase:', error);
            } else {
                setPersonaFromSupabase(data?.personality || 'ITMP'); // Default to 'ITMP' if no persona is set
            }
        };
        fetchPersona();
    }, []);

    const handleGetAnswer = () => {
        setShowAccountPopup(true); 
    };

    const handleClosePopup = () => {
        setShowAccountPopup(false); 
    };

    const toggleAdvancedSettings = () => {
        setShowAdvancedSettings(prev => !prev);
    };

    const handlePersonaChange = (event) => {
        setSelectedPersona(event.target.value);
    };

    return (
        <SectionWrapper id="faqs">
            {/* Center the content both vertically and horizontally */}
            <div className="flex justify-center items-center min-h-screen">
                {/* Adjusted padding, width, max-width, and added height for aspect ratio */}
                <div className="bg-gray-900 text-gray-300 rounded-lg p-6 w-3/5 max-w-5xl border-4 border-white drop-shadow-[0_20px_25px_rgba(128,90,213,0.7)] transition-all duration-300 hover:scale-105">
                    <div className="max-w-2xl mx-auto text-center xl:mx-auto">
                        {/* Increased font sizes for better visibility */}
                        <h2 className="text-gray-50 text-5xl font-extrabold sm:text-6xl whitespace-nowrap overflow-hidden overflow-ellipsis">
                            Try It Now
                        </h2>
                        <p className="mt-4 text-xl">
                            Don't have a hard decision to make? Man, you're lucky.
                        </p>
                    </div>
                    <div className="mt-8 relative">
                        {/* Increased textarea height and padding */}
                        <textarea
                            className="w-full h-96 p-6 border border-gray-700 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Ask anything..."
                        />
                        <div className="absolute bottom-6 left-6 flex space-x-4">
                            {/* Increased button padding and text size */}
                            <label className="bg-gray-700 text-gray-300 font-bold py-3 px-4 rounded-lg cursor-pointer text-base">
                                Attach Context
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </label>
                            <button
                                className="bg-gray-700 text-gray-300 font-bold py-3 px-4 rounded-lg cursor-pointer text-base"
                                onClick={toggleAdvancedSettings}
                            >
                                Advanced Settings
                            </button>
                        </div>
                        {showAdvancedSettings && (
                            <div className="absolute top-0 right-0 bottom-0 bg-gray-700 text-gray-300 w-1/2 h-full p-6">
                                {/* Increased close button size */}
                                <button
                                    className="text-gray-400 hover:text-gray-300 absolute top-6 right-6 text-2xl"
                                    onClick={toggleAdvancedSettings}
                                >
                                    &times;
                                </button>
                                {/* Increased heading and spacing */}
                                <h3 className="text-2xl font-bold mb-6">Select Persona</h3>
                                <select
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded mb-6 text-lg"
                                    value={selectedPersona}
                                    onChange={handlePersonaChange}
                                >
                                    <option value="">-- Select Persona --</option>
                                    <option value="Uncle Iroh">Uncle Iroh</option>
                                    <option value="Rocky Balboa">Rocky Balboa</option>
                                    <option value="Cupid">Cupid</option>
                                    <option value="David Goggins">David Goggins</option>
                                    <option value="Jordan Belfort">Jordan Belfort</option>
                                </select>
                                <div className="mt-6">
                                    <button className="text-gray-300 font-bold text-lg">
                                        Responding to: {personaFromSupabase}
                                    </button>
                                    <div className="mt-4 text-lg flex items-center space-x-3">
                                        <FaInfoCircle className="text-gray-400" />
                                        <a href="/account" className="text-blue-400 hover:underline">
                                            Activate Personalization
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center mt-8">
                        {/* Increased button size and font */}
                        <button
                            className="focus:outline-none bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-300 text-lg"
                            onClick={handleGetAnswer}
                        >
                            Get Answer
                        </button>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                    {fileName}
                </div>
            )}
            {showAccountPopup && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    {/* Increased padding and max-width for the modal */}
                    <div className="bg-gray-800 text-white py-10 px-12 rounded-2xl shadow-2xl text-center max-w-md w-full transform transition-all duration-300 hover:scale-105">
                        <Brand />
                        {/* Increased text sizes and spacing */}
                        <p className="mt-8 text-2xl font-bold tracking-wide">Create An Account</p>
                        <p className="mt-4 text-lg text-gray-400">Create an account for free or sign in.</p>
                        <div className="mt-10 flex justify-center space-x-8">
                            {/* Increased button sizes and text */}
                            <button
                                className="relative py-4 px-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 hover:from-purple-700 hover:to-blue-700 text-lg"
                                onClick={() => window.location.href = '/login'}
                            >
                                Log In
                                <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-white transition-all duration-300"></div>
                            </button>
                            <button
                                className="relative py-4 px-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 hover:from-purple-700 hover:to-blue-700 text-lg"
                                onClick={() => window.location.href = '/register'}
                            >
                                Register
                                <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-white transition-all duration-300"></div>
                            </button>
                        </div>
                        {/* Increased Close button size and spacing */}
                        <button
                            className="mt-10 py-4 px-8 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 hover:from-red-600 hover:to-red-700 text-lg"
                            onClick={handleClosePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </SectionWrapper>
    );
};

export default AppPage;
