'use client'

import React from 'react'
import {useAuth} from "@/lib/auth-provider";
import SvgLoading from "@/ui/svgs/svg-loading";
import Link from 'next/link'

const criteriaList = [
    'At least one lower case letter',
    'At least one upper case letter',
    'At least one digit',
    // Broadened the special characters regex for better coverage
    'At least one special character (!@#$%^&*()_+-=[]{};:\'",.<>/?`~)',
    'Minimum length of 8 characters',
]

const Signup = () => {
    const {signup} = useAuth()
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const [status, setStatus] = React.useState<'idle' | 'submit' | 'success' | 'error' | 'emailNotSent'>('idle')
    const [remainingCriteria, setRemainingCriteria] = React.useState<string[]>([])
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'email' ? value.toLowerCase() : value
        }))
    }

    const updateSatisfiedCriteria = React.useCallback((newPassword: string) => {
        const updatedCriteria = criteriaList.filter((criterion) => {
            switch (criterion) {
                case 'At least one lower case letter':
                    return !/[a-z]/.test(newPassword);
                case 'At least one upper case letter':
                    return !/[A-Z]/.test(newPassword);
                case 'At least one digit':
                    return !/\d/.test(newPassword);
                case 'At least one special character (!@#$%^&*()_+-=[]{};:\'",.<>/?`~)':
                    return !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(newPassword);
                case 'Minimum length of 8 characters':
                    return newPassword.length < 8;
                default:
                    return true;
            }
        });
        setRemainingCriteria(updatedCriteria);
    }, []);

    React.useEffect(() => {
        updateSatisfiedCriteria(formData.password);
    }, [formData.password, updateSatisfiedCriteria]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('submit')
        setErrorMessage('')

        try {
            const res = await signup(formData)

            if (res.success) {
                setStatus('success')
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: ''
                })
            } else {
                if (res.error?.includes('Activation email not sent.')) {
                    setStatus('emailNotSent')
                    setErrorMessage(res.error)
                } else {
                    setStatus('error')
                    setErrorMessage(res.error ?? 'An unexpected error occurred during signup.')
                }
            }
        } catch (err: unknown) { // Changed 'any' to 'unknown'
            console.error("Signup error:", err);
            setStatus('error')
            // Safely access message if err is an Error object, otherwise provide a generic message
            if (err instanceof Error) {
                setErrorMessage(err.message || 'Failed to connect to the server. Please try again.')
            } else {
                setErrorMessage('Failed to connect to the server. Please try again.')
            }
        }
    }

    if (status === 'emailNotSent') {
        return (
            <section className='content-grid text-center'>
                <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative' role='alert'>
                    <strong className='font-bold'>Account Created!</strong>
                    <span className='block sm:inline'> Your account has been created successfully. The activation email could not be sent at the moment, but you can still activate your account later. This will happen when you request for another activation email link when required. Thank you!
                 <Link href='/account/login' className='underline hover:text-sky-800'>
                            Log in
                    </Link>
                </span>
                </div>
            </section>
        )
    }

    if (status === 'success') {
        return (
            <section className='content-grid text-center'>
                <div className='bg-green-100 border border-green-400 text-green-900 px-4 py-6 rounded relative'
                     role='alert'>
                    <strong className='font-extrabold uppercase text-xl'>Success!</strong>
                    <span className='block sm:inline text-lg'> Your account has been <span className='font-bold'>created successfully. Check your email to activate your account, if you don&apos;t see the email be sure to check your spam folder as well</span>. Thank You!</span>
                </div>
            </section>
        )
    }

    const handleToggleShowPassword = () => setShowPassword(prevState => !prevState)

    return (
        <form onSubmit={handleSubmit}
              className='grid gap-4 max-w-3xl w-full mx-auto sm:border border-sky-600 sm:p-4'>
            <small className='text-red-600 font-bold uppercase'>** Please fill in all the fields **</small>
            <section className='grid gap-2'>
                <label htmlFor="name" className='uppercase font-bold'>Full Name:</label>
                <input
                    type="text"
                    id='name'
                    name='name'
                    value={formData.name}
                    className='input rounded capitalize'
                    placeholder='John Doe'
                    onChange={handleChange}
                    required
                />
            </section>
            <section className='grid gap-2'>
                <label htmlFor="email" className='uppercase font-bold'>Email:</label>
                <input
                    type="email"
                    id='email'
                    name='email'
                    value={formData.email}
                    className='input rounded'
                    placeholder='johndoe@example.com'
                    onChange={handleChange}
                    required
                />
            </section>
            <section className='grid gap-2'>
                <label htmlFor="password" className='uppercase font-bold'>Password:</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    value={formData.password}
                    className='input rounded'
                    placeholder='Please choose a strong password, some checks are below.'
                    onChange={handleChange}
                    required
                />
                <ul className='text-red-600 font-bold list-disc text-md list-inside'>
                    {remainingCriteria.map((criterion, index) => (
                        <li key={index}>{criterion}</li>
                    ))}
                </ul>
            </section>
            <section className='grid gap-2'>
                <label htmlFor="confirm_password" className='uppercase font-bold'>Confirm Password:</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id='confirm_password'
                    name='confirm_password'
                    value={formData.confirm_password}
                    className='input rounded'
                    placeholder='Re-enter the above password for confirmation'
                    onChange={handleChange}
                    required
                />
            </section>
            <section className='flex gap-2 items-center flex-row-reverse w-fit'>
                <label htmlFor="show-pwd" className='cursor-pointer font-bold'>Show Password</label>
                <input
                    id='show-pwd'
                    type="checkbox"
                    checked={showPassword}
                    onChange={handleToggleShowPassword} className='cursor-pointer'
                />
            </section>
            {formData.password !== formData.confirm_password &&
             <p className='text-red-600 font-bold py-1'>Passwords don&apos;t match.</p>}
            {status === 'error' &&
             <p className='text-red-600 font-bold py-1'>{errorMessage}</p>
            }
            <button
                className='button bg-sky-700 text-sky-100 py-2 rounded uppercase font-bold disabled:bg-sky-600 disabled:cursor-not-allowed md:w-1/6 hover:bg-sky-950 active:scale-105'
                disabled={
                    formData.password !== formData.confirm_password ||
                    !formData.name ||
                    !formData.email ||
                    !formData.password ||
                    !formData.confirm_password ||
                    // remainingCriteria.length > 0 ||
                    status === 'submit'
                }
            >
                {
                    status === 'submit'
                        ? <SvgLoading/>
                        : 'Sign up'
                }
            </button>
            <em>Already have an account? <Link href="/account/login" className='uppercase font-bold underline'>login
                here</Link> </em>
        </form>
    )
}
export default Signup