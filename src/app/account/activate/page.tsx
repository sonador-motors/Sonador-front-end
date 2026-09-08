'use client'

import React from 'react'
import { useAuth } from "@/lib/auth-provider"
import Link from 'next/link'
import { useSearchParams } from "next/navigation";

const Activate = () => {
    const searchParams = useSearchParams(); // Get the search params object

    const { activateUser } = useAuth();
    const [activationStatus, setActivationStatus] = React.useState<'activating' | 'success' | 'error' | 'invalid'>('activating');
    const [feedback, setFeedback] = React.useState<string>('');
    // State to ensure activation only runs once per component mount (or until UID/Token change)
    const [hasActivated, setHasActivated] = React.useState<boolean>(false);

    // Get uid and token from searchParams ONCE per render cycle,
    // they are part of the URL and typically don't change without a navigation.
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    React.useEffect(() => {
        // Only attempt activation if we haven't already and we have uid/token
        if (hasActivated || !uid || !token) {
            if (!uid || !token) {
                setActivationStatus('invalid');
                setFeedback('The activation link is incomplete. Missing UID or Token.');
            }
            return; // Exit if already activated or missing params
        }

        const activate = async () => {
            setActivationStatus('activating');
            setFeedback('');

            try {
                // Introduce a small delay for visual feedback if needed, but not strictly required
                await new Promise(resolve => setTimeout(resolve, 500));

                const res = await activateUser(uid, token); // Use the constants from above

                if (!res.success) {
                    setActivationStatus('error');
                    setFeedback(res.error ?? 'An unknown error occurred during activation.');
                } else {
                    setActivationStatus('success');
                    setFeedback(res.message ?? 'Account activated successfully!');
                }
            } catch (e: unknown) {
                setActivationStatus('error');
                // Safely get error message, defaulting to a generic one
                if (e instanceof Error) {
                    setFeedback(e.message || 'An unexpected network error occurred during activation. Please try again.');
                } else {
                    setFeedback('An unexpected network error occurred during activation. Please try again.');
                }
            } finally {
                // Mark that an activation attempt has been made, regardless of outcome
                setHasActivated(true);
            }
        };

        activate();

    }, [uid, token, activateUser, hasActivated]); // Dependencies: uid, token, activateUser, hasActivated

    const LoginLink = (
       <Link href='/account/login' className='bg-sky-700 text-sky-100 py-2 px-4 rounded-md transition duration-300 hover:bg-sky-800'>
          Login Into Your Account
       </Link>
    );

    const renderMessage = () => {
       switch (activationStatus) {
          case 'success':
             return (
                <div className='grid space-y-6 items-center'>
                   <div className='bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md'>
                      <p className='text-lg font-semibold'>Activation Successful!</p>
                      {feedback && <p>{feedback}</p>}
                   </div>
                   {LoginLink}
                </div>
             );
          case 'error':
             return (
                <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md'>
                   <p className='text-lg font-semibold'>{feedback}</p>
                   <p className='text-gray-700'>Please check your activation link or try logging in.</p>
                   {LoginLink}
                </div>
             );
          case 'invalid':
             return (
                <div className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md'>
                   <p className='text-lg font-semibold'>{feedback || 'Invalid activation link.'}</p>
                   <p className='text-gray-700'>Please ensure you used the correct link from your email.</p>
                   {LoginLink}
                </div>
             );
          default: // 'activating'
             return (
                <div className='bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md'>
                   <p className='text-lg font-semibold'>Activating your account...</p>
                   {feedback && <p>{feedback}</p>}
                </div>
             );
       }
    };

    return (
          <main className='content-grid'>
             <section className='text-center my-10'>
                {renderMessage()}
             </section>
          </main>
    );
};
export default Activate;