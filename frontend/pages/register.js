import { useState, useEffect } from 'react';
import Head from "next/head";
import Link from "next/link";
import Brand from "@/components/ui/Brand";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { GoogleIcon } from "@/components/Icons";
import { supabase } from "@/supabaseclient";

export default function Register() {
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('error');  // 'success' or 'error'
  const [password, setPassword] = useState('');
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [includesNumber, setIncludesNumber] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      showPopupMessage('Passwords do not match', 'error');
      return;
    }

    if (!isLengthValid || !includesNumber) {
      showPopupMessage('Password must be at least 6 characters long and include a number', 'error');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstName, lastName }
      }
    });

    if (error) {
      showPopupMessage('Error signing up: ' + error.message, 'error');
    } else {
      if (data && data.user) {
        await createUserRecord(data.user.id, firstName, lastName);
        showPopupMessage('Success! Account created.', 'success');
        // Optionally redirect the user or clear form fields here
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });

    if (error) {
      showPopupMessage('Error logging in: ' + error.message, 'error');
    } else {
      showPopupMessage('Successfully logged in with Google.', 'success');
      // Optionally redirect the user here
    }
  };

  const createUserRecord = async (userId, firstName, lastName) => {
    const { error } = await supabase
      .from('main')
      .insert([{ id: userId, firstName, lastName, personality: '' }]);

    if (error) {
      console.error('Error creating user record:', error);
    } else {
      console.log('User record created successfully');
    }
  };

  const showPopupMessage = (message, type) => {
    setMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Popup will disappear after 3 seconds
  };

  const validatePassword = (password) => {
    setPassword(password);
    setIsLengthValid(password.length >= 6);
    setIncludesNumber(/\d/.test(password));
  };

  return (
    <>
      <Head>
        <title>Register - smart8ball</title>
      </Head>
      <main className='w-full h-screen flex flex-col items-center justify-center px-4 pt-10'>
        <div className='max-w-sm w-full text-gray-300'>
          <div className='text-center'>
            <Brand className='mx-auto w-32' />
            <div className='mt-5 space-y-2'>
              <h1 className='text-white text-2xl font-bold sm:text-3xl'>
                Create your account
              </h1>
              <p className=''>
                Already have an account?{" "}
                <Link
                  href='/login'
                  className='font-medium text-purple-500 hover:text-purple-600 duration-150'>
                  Log In
                </Link>
              </p>
            </div>
          </div>
          <form onSubmit={handleSignUp} className='mt-8 space-y-5'>
            <div className='flex space-x-4'>
              <div className='w-1/2'>
                <label className='font-medium'>First Name</label>
                <Input
                  type='text'
                  name='firstName'
                  required
                  className='w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800'
                />
              </div>
              <div className='w-1/2'>
                <label className='font-medium'>Last Name</label>
                <Input
                  type='text'
                  name='lastName'
                  required
                  className='w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800'
                />
              </div>
            </div>
            <div>
              <label className='font-medium'>Email</label>
              <Input
                type='email'
                name='email'
                required
                className='w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800'
              />
            </div>
            <div>
              <label className='font-medium'>Password</label>
              <Input
                type='password'
                name='password'
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                required
                className='w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800'
              />
            </div>
            <div>
              <label className='font-medium'>Confirm Password</label>
              <Input
                type='password'
                name='confirmPassword'
                required
                className='w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800'
              />
            </div>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center'>
                <div className={`w-4 h-4 rounded-full ${isLengthValid ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                <span className='text-gray-300'>At least 6 characters</span>
              </div>
              <div className='flex items-center'>
                <div className={`w-4 h-4 rounded-full ${includesNumber ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                <span className='text-gray-300'>Includes a number</span>
              </div>
            </div>
            <Button className='w-full text-gray-800 bg-gray-100 hover:bg-gray-200 ring-offset-2 focus:ring rounded-lg'>
              Sign Up
            </Button>
            <button
              type='button'
              onClick={handleGoogleSignIn}
              className='w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-800 rounded-lg text-sm font-medium bg-gray-800/40 hover:bg-gray-800 ring-purple-500 focus:ring duration-150'>
              <GoogleIcon />
              Sign Up with Google
            </button>
          </form>
        </div>
        {showPopup && (
          <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${popupType === 'success' ? 'bg-green-500' : 'bg-red-600'} text-white px-4 py-2 rounded`}>
            {message}
          </div>
        )}
      </main>
    </>
  );
}
