import { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '@/supabaseclient'; // Import the supabase client
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'; // Import Heroicons for navigation
import { useRouter } from 'next/router'; // Import useRouter for redirection

const questions = [
  { id: 1, text: "Do you prefer to focus on the outer world or on your own inner world?", options: ["Extraversion (E)", "Introversion (I)"] },
  { id: 2, text: "Do you prefer to focus on the basic information you take in or do you prefer to interpret and add meaning?", options: ["Sensing (S)", "Intuition (N)"] },
  { id: 3, text: "When making decisions, do you prefer to first look at logic and consistency or first look at the people and special circumstances?", options: ["Thinking (T)", "Feeling (F)"] },
  { id: 4, text: "In dealing with the outside world, do you prefer to get things decided or do you prefer to stay open to new information and options?", options: ["Judging (J)", "Perceiving (P)"] },
];

export default function Account() {
  const router = useRouter(); // Initialize useRouter here
  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [selectedTab, setSelectedTab] = useState('');
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [personalityType, setPersonalityType] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(user);
        if (user) {
          fetchPersonalityType(user.id);
        }
      }
    };
    fetchUser();
  }, []);

  const fetchPersonalityType = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('personality')
      .eq('id', userId)
      .single();
    if (error) {
      console.error('Error fetching personality type:', error);
    } else {
      if (data && data.personality) {
        setPersonalityType(data.personality);
        setQuizCompleted(data.personality !== "none");
      }
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } else {
      router.push('/'); // Redirect to the home page
    }
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const updateTab = (tab) => {
    setSelectedTab(tab);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculatePersonalityType = () => {
    // Ensure all questions have been answered
    const allAnswered = questions.every(question => answers[question.id]);
    
    if (!allAnswered) {
      alert('Please answer all questions before submitting.');
      return;
    }
    
    let type = '';
    type += answers[1]?.charAt(0) || '';
    type += answers[2]?.charAt(0) || '';
    type += answers[3]?.charAt(0) || '';
    type += answers[4]?.charAt(0) || '';
    setPersonalityType(type);
    updatePersonalityInSupabase(type);
  };

  const updatePersonalityInSupabase = async (type) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .update({ personality: type })
      .eq('id', user.id);
    if (error) {
      console.error('Error updating personality type:', error);
    } else {
      console.log('Personality type updated:', data);
    }
  };

  const retakeQuiz = () => {
    setQuizCompleted(false);
    setAnswers({});
    setPersonalityType('none');
    setCurrentQuestionIndex(0);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const displayContent = () => {
    if (selectedTab === 'Personality') {
      if (personalityType === 'none') {
        return (
          <div className="relative">
            {quizCompleted ? (
              <div className="text-center">
                <p className="text-lg font-semibold mb-4">Your personality type is: {personalityType}</p>
                <button
                  onClick={retakeQuiz}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md"
                >
                  Retake Quiz
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <p className="text-lg font-semibold mb-2">{questions[currentQuestionIndex].text}</p>
                  {questions[currentQuestionIndex].options.map((option) => (
                    <label key={option} className="block mb-2">
                      <input
                        type="radio"
                        name={`question-${questions[currentQuestionIndex].id}`}
                        value={option}
                        checked={answers[questions[currentQuestionIndex].id] === option}
                        onChange={() => handleAnswerChange(questions[currentQuestionIndex].id, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                  >
                    <ArrowRightIcon className="h-5 w-5" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setQuizCompleted(true);
                    calculatePersonalityType();
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                  disabled={!questions.every(question => answers[question.id])} // Disable button if any question is unanswered
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div className="text-center">
            <p className="text-lg font-semibold mb-4">Your personality type is already set to {personalityType}.</p>
            <button
              onClick={retakeQuiz}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md"
            >
              Retake Quiz
            </button>
          </div>
        );
      }
    }

    switch (selectedTab) {
      case 'payment':
        return "Manage your payment information here.";
      default:
        return user ? `Welcome to your account, ${user.user_metadata.full_name} (${user.email})` : "Welcome to your account"; // Use user's name and email in the welcome message
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
              <li className={`text-gray-700 font-medium w-full text-left ${selectedTab === 'Personality' ? 'bg-gray-300' : ''}`} onClick={() => updateTab('Personality')}>
                Personality Quiz
              </li>
              <li className={`text-gray-700 font-medium w-full text-left ${selectedTab === 'payment' ? 'bg-gray-300' : ''}`} onClick={() => updateTab('payment')}>
                Manage Payment
              </li>
              <li className={`text-gray-700 font-medium w-full text-left`}>
                <button onClick={confirmLogout} className="text-red-600">
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
