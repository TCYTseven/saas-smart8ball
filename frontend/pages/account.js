import { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '@/supabaseclient';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

const questions = [
  {
    id: 1,
    text: "Would you say that you are a unique person?",
    options: ["Yes, I am unique", "No, I am more like others"]
  },
  {
    id: 2,
    text: "Which approach do you use most often when tackling tasks?",
    options: [
      "Decide quickly and work steadily towards your goal",
      "Carefully plan and help others with execution",
      "Gather information, then make a last-minute creative burst",
      "Jump in, trust your instincts, and learn as you go"
    ]
  },
  {
    id: 3,
    text: "In group situations, do you usually:",
    options: [
      "Care for people and ensure everyone gets along",
      "Make sure things get done, even if you have to be direct"
    ]
  },
  {
    id: 4,
    text: "When trying to change someone's opinion, do you:",
    options: [
      "Use facts and logical arguments to persuade them",
      "Use personal stories and emotional appeals to persuade them"
    ]
  }
];

const allPersonalityTypes = [
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
  "INTJ", "INFP", "ENTJ", "ENFP",
  "INFJ", "ENFJ", "INTP", "ENTP"
];

const descriptions = {
  "ISTJ": "ISTJs are known for their practicality and reliability. They value tradition and order and prefer to work with clear guidelines and structures.",
  "ISFJ": "ISFJs are warm and compassionate. They are dedicated to helping others and are known for their attention to detail and loyalty.",
  "ESTJ": "ESTJs are assertive and efficient. They are natural leaders who value organization and are committed to maintaining order and productivity.",
  "ESFJ": "ESFJs are sociable and caring. They are focused on harmony and the needs of others, often taking on roles that involve nurturing and supporting those around them.",
  "ISTP": "ISTPs are independent and resourceful. They are practical problem-solvers who enjoy working with their hands and analyzing situations to find effective solutions.",
  "ISFP": "ISFPs are sensitive and artistic. They value personal expression and are often drawn to creative pursuits, enjoying the freedom to explore their own ideas.",
  "ESTP": "ESTPs are energetic and adventurous. They thrive on action and are known for their ability to adapt quickly to changing circumstances.",
  "ESFP": "ESFPs are lively and spontaneous. They enjoy living in the moment and are often the life of the party, bringing enthusiasm and a sense of fun to their interactions.",
  "INTJ": "INTJs are strategic and visionary. They are focused on long-term goals and are known for their ability to develop innovative solutions to complex problems.",
  "INFP": "INFPs are idealistic and empathetic. They are guided by their values and seek to make a positive impact on the world through their creativity and compassion.",
  "ENTJ": "ENTJs are decisive and confident. They are natural leaders who excel in organizing and directing efforts toward achieving ambitious objectives.",
  "ENFP": "ENFPs are enthusiastic and imaginative. They are driven by their ideals and are skilled at inspiring others with their passion and creativity.",
  "INFJ": "INFJs are insightful and caring. They are deeply focused on understanding and helping others, often using their intuition to guide their actions and decisions.",
  "ENFJ": "ENFJs are charismatic and supportive. They are driven by a desire to help others reach their potential and are often seen as empathetic and influential leaders.",
  "INTP": "INTPs are analytical and objective. They enjoy exploring abstract ideas and theories, seeking to understand the underlying principles of how things work.",
  "ENTP": "ENTPs are innovative and energetic. They are known for their quick thinking and ability to generate creative solutions to challenges and problems."
};

export default function Account() {
  const router = useRouter();
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
      router.push('/');
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

  const determineType = (typeCode) => {
    const typeMap = {
      "ISTJ": ["S", "J", "T"],
      "ISFJ": ["S", "J", "F"],
      "ESTJ": ["S", "J", "T"],
      "ESFJ": ["S", "J", "F"],
      "ISTP": ["S", "P", "T"],
      "ISFP": ["S", "P", "F"],
      "ESTP": ["S", "P", "T"],
      "ESFP": ["S", "P", "F"],
      "INTJ": ["N", "J", "T"],
      "INFP": ["N", "P", "F"],
      "ENTJ": ["N", "J", "T"],
      "ENFP": ["N", "P", "F"],
      "INFJ": ["N", "J", "F"],
      "ENFJ": ["N", "J", "F"],
      "INTP": ["N", "P", "T"],
      "ENTP": ["N", "P", "T"]
    };

    return Object.keys(typeMap).find(type => 
      typeMap[type].every((code, i) => code === typeCode[i])
    );
  };

  const getRandomPersonality = () => {
    const randomIndex = Math.floor(Math.random() * allPersonalityTypes.length);
    return allPersonalityTypes[randomIndex];
  };

  const calculatePersonalityType = () => {
    // Ensure all questions have been answered
    const allAnswered = questions.every(q => answers[q.id]);
    if (!allAnswered) return;

    // Example logic to determine type based on answers
    let typeCode = '';

    // Example logic (replace with actual logic based on answers)
    typeCode = "ISTJ"; // Example; replace with your own logic

    // Determine the personality type based on the typeCode
    const result = determineType(typeCode) || getRandomPersonality();
    setPersonalityType(result);

    // Save the result to the database
    if (user) {
      supabase
        .from('profiles')
        .update({ personality: result })
        .eq('id', user.id)
        .then(({ error }) => {
          if (error) {
            console.error('Error saving personality type:', error);
          }
        });
    }
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

  const retakeQuiz = () => {
    setQuizCompleted(false);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setPersonalityType('');

    // Trigger a fetch to re-calculate and save personality type
    if (user) {
      calculatePersonalityType(); // Ensure this function is being called to save the new type
    }
  };

  const displayContent = () => {
    if (selectedTab === 'Personality') {
      if (!quizCompleted) {
        return (
          <div className="flex flex-col items-center text-gray-200">
            {!personalityType ? (
              <div className="relative bg-gray-900 p-4 rounded-lg shadow-md">
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
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md"
                  >
                    <ArrowRightIcon className="h-5 w-5" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setQuizCompleted(true);
                    calculatePersonalityType();
                  }}
                  className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-md"
                  disabled={!questions.every(question => answers[question.id])}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg font-semibold mb-4">Your personality type is: {personalityType}</p>
                <p className="mb-4">{descriptions[personalityType]}</p>
                <button
                  onClick={retakeQuiz}
                  className="px-4 py-2 bg-green-700 text-white rounded-md"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div className="text-center text-gray-200">
            <p className="text-lg font-semibold mb-4">Your personality type is set to {personalityType}.</p>
            <p className="mb-4">{descriptions[personalityType]}</p>
            <button
              onClick={retakeQuiz}
              className="px-4 py-2 bg-green-700 text-white rounded-md"
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
        return user ? `Welcome to your account, ${user.user_metadata.full_name} (${user.email})` : "Welcome to your account";
    }
  };

  return (
    <>
      <Head>
        <title>Account - smart8ball</title>
      </Head>
      <main className='w-full h-screen flex items-center justify-center bg-gray-900'>
        <div className='w-full md:w-3/4 h-3/4 bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row'>
          <nav className='w-full md:w-1/4 bg-gray-700 rounded-l-lg p-4'>
            <ul className='space-y-4'>
              <li className={`text-gray-300 font-medium w-full text-left cursor-pointer ${selectedTab === 'Personality' ? 'bg-gray-600' : ''}`} onClick={() => updateTab('Personality')}>
                User Personality
              </li>
              <li className={`text-gray-300 font-medium w-full text-left cursor-pointer ${selectedTab === 'payment' ? 'bg-gray-600' : ''}`} onClick={() => updateTab('payment')}>
                Manage Payment
              </li>
              <li className={`text-gray-300 font-medium w-full text-left cursor-pointer`}>
                <button onClick={confirmLogout} className="text-red-400">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          <div className='w-full md:w-3/4 p-4 md:p-8'>
            <h1 className='text-xl md:text-2xl font-bold text-gray-200'>{displayContent()}</h1>
          </div>
        </div>
        {showLogoutConfirm && (
          <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center'>
            <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
              <p className="text-gray-200">Are you sure you want to log out?</p>
              <div className='mt-4 flex justify-end space-x-4'>
                <button onClick={cancelLogout} className='px-4 py-2 bg-gray-600 text-gray-200 rounded-md'>
                  Cancel
                </button>
                <button onClick={handleLogout} className='px-4 py-2 bg-red-700 text-white rounded-md'>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        {showPopup && (
          <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-4 py-2 rounded'>
            Error logging out. Please try again.
          </div>
        )}
      </main>
    </>
  );
}
