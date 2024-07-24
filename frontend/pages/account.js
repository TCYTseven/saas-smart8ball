import { useState } from 'react';
import Head from "next/head";
import { supabase } from "@/supabaseclient";  // Import the supabase client

export default function Account() {
  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [selectedTab, setSelectedTab] = useState('');  // State to keep track of the selected tab

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } else {
      // Redirect to login page or show logged out message
    }
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Function to update selected tab
  const updateTab = (tab) => {
    setSelectedTab(tab);
  };

  // Decide what text to display based on the selected tab
  const displayContent = () => {
    switch (selectedTab) {
      case 'lorem':
        return "Lorem gyat";
      case 'payment':
        return "Rizz";
      default:
        return "Welcome to your account"; // Default text when no tab is selected
    }
  };

  return (
    <>
      <Head>
        <title>Account - smart8ball</title>
      </Head>
      <main className='w-full h-screen flex items-center justify-center bg-gray-800'>
        <div className='w-full md:w-3/4 h-3/4 bg-white rounded-lg shadow-lg flex flex-col md:flex-row'>
          <nav className='w-full md:w-1/4 bg-gray-200 rounded-l-lg p-4'>
            <ul className='space-y-4'>
              <li className={`text-gray-700 font-medium w-full text-left ${selectedTab === 'lorem' ? 'bg-gray-300' : ''}`} onClick={() => updateTab('lorem')}>
                Lorem Ipsum
              </li>
              <li className={`text-gray-700 font-medium w-full text-left ${selectedTab === 'payment' ? 'bg-gray-300' : ''}`} onClick={() => updateTab('payment')}>
                Manage Payment
              </li>
              <li className={`text-gray-700 font-medium w-full text-left`}>
                <button onClick={confirmLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          <div className='w-full md:w-3/4 p-4 md:p-8'>
            <h1 className='text-xl md:text-2xl font-bold text-gray-800'>{displayContent()}</h1>
          </div>
        </div>
        {showLogoutConfirm && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <p>Are you sure you want to log out?</p>
              <div className='mt-4 flex justify-end space-x-4'>
                <button onClick={cancelLogout} className='px-4 py-2 bg-gray-300 rounded-md'>
                  Cancel
                </button>
                <button onClick={handleLogout} className='px-4 py-2 bg-red-600 text-white rounded-md'>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        {showPopup && (
          <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded'>
            Error logging out. Please try again.
          </div>
        )}
      </main>
    </>
  );
}
