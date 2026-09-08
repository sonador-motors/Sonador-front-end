'use client'

import React from 'react'
import {useAuth} from "@/lib/auth-provider";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import SvgLoading from "@/ui/svgs/svg-loading";
import { ResetPasswordConfirmCredentials } from "@/lib/types";

const ResetPwdConfirm = () => {
    const [formData, setFormData] = React.useState({
       new_password: '',
       re_new_password: ''
    })
    const {resetPwdConfirm} = useAuth()
    // Explicitly type the status to include all possible states
    const [status, setStatus] = React.useState<'idle' | 'submit' | 'success' | 'error' | 'invalid_link'>('idle')
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null) // Correctly typed as string | null
    const params = useSearchParams()
    const uid = params.get('uid') // Returns string | null
    const token = params.get('token') // Returns string | null

    // Effect to check for missing uid/token on initial load
    React.useEffect(() => {
        if (!uid || !token) {
            setStatus('invalid_link');
            setErrorMessage('Invalid or incomplete password reset link. Please check your email.');
        }
    }, [uid, token]); // Dependencies ensure this runs if params change (though unlikely for this page)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const {name, value} = e.target
       setFormData(prevState => ({
          ...prevState,
          [name]: value
       }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()

       // --- Crucial check for uid and token ---
       if (!uid || !token) {
           setStatus('invalid_link');
           setErrorMessage('Missing UID or Token in the URL. Cannot reset password.');
           return; // Stop the submission if parameters are missing
       }

       // Now that we've checked, uid and token are guaranteed to be strings.
       // Explicitly type `data` to match the expected interface.
       const data: ResetPasswordConfirmCredentials = {
          uid: uid, // uid is now guaranteed to be a string
          token: token, // token is now guaranteed to be a string
          new_password: formData.new_password,
          re_new_password: formData.re_new_password
       }

       setStatus('submit')
       setErrorMessage(null); // Clear any previous error messages on new submission attempt

       const res = await resetPwdConfirm(data)
       if (!res.success) {
          setStatus('error')
          // Use nullish coalescing (??) to provide a fallback string if res.error is undefined
          setErrorMessage(res.error ?? 'An unexpected error occurred during password reset.')
       } else {
          setStatus('success')
          // No need to set a message here for success, as the UI handles it
       }
    }

    const handleToggleShowPassword = () => setShowPassword(prevState => !prevState)

    // Render logic based on status
    if (status === 'success') {
       return (
          <div className='flex items-center flex-col gap-4'>
             <div className='bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-20 rounded-md'>
                <p className='text-lg font-semibold'>Password Updated Successfully!</p>
             </div>
             <Link href='/account/login' className='mb-20'>
                <span className='bg-sky-700 text-sky-100 py-2 px-4 rounded-md transition duration-300 hover:bg-sky-800'>
                   Login Into Your Account
                </span>
             </Link>
          </div>
       );
    }

    if (status === 'invalid_link') {
        return (
            <div className='flex items-center flex-col gap-4'>
                <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-20 rounded-md'>
                    <p className='text-lg font-semibold'>{errorMessage}</p>
                    <p className='text-gray-700'>Please ensure you used the correct link from your email.</p>
                </div>
                <Link href='/account/reset-password' className='mb-20'> {/* Link to request new reset */}
                    <span className='bg-gray-700 text-gray-100 py-2 px-4 rounded-md transition duration-300 hover:bg-gray-800'>
                       Request New Password Reset Link
                    </span>
                </Link>
            </div>
        );
    }

    return (
       <form onSubmit={handleSubmit} method='POST' className='my-10 gap-4 grid max-w-3xl mx-auto w-full'>
          <section className='grid gap-2'>
             <label htmlFor="new_pwd">New Password:</label>
             <input
                type={showPassword ? 'text' : 'password'}
                id='new_pwd'
                name='new_password'
                value={formData.new_password}
                className='input rounded'
                placeholder='Enter new password'
                onChange={handleChange}
                required
             />
          </section>
          <section className='grid gap-2'>
             <label htmlFor="re_new_pwd">Confirm Password:</label>
             <input
                type={showPassword ? 'text' : 'password'}
                id='re_new_pwd'
                name='re_new_password'
                value={formData.re_new_password}
                className='input rounded'
                placeholder='Confirm new password'
                onChange={handleChange}
                required
             />
          </section>
          <section className='flex gap-2 items-center flex-row-reverse w-fit'>
             <label htmlFor="show-pwd" className='cursor-pointer'>Show password</label>
             <input
                id='show-pwd'
                type="checkbox"
                checked={showPassword}
                onChange={handleToggleShowPassword} className='cursor-pointer'
             />
          </section>
          {/* Display error message only if status is 'error' and message exists */}
          {status === 'error' && errorMessage && <p className='text-red-500 font-bold'>{errorMessage}</p>}

          <button
             className='button bg-sky-700 text-sky-100 py-2 rounded uppercase font-bold md:w-2/4 hover:bg-sky-950 active:scale-105 disabled:bg-sky-500 disabled:cursor-not-allowed'
             // Disable if submitting, or if passwords are empty, or if link is invalid
             disabled={status === 'submit' || !formData.new_password || !formData.re_new_password || formData.new_password !== formData.re_new_password}
          >{status === 'submit'
             ? <SvgLoading/>
             : 'reset password'}</button>
       </form>
    )
}
export default ResetPwdConfirm