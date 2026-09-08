'use client'
import React from 'react'
import {useAuth} from "@/lib/auth-provider";
import SvgLoading from "@/ui/svgs/svg-loading";

const ResetPwdForm = () => {
	const {resetPwd} = useAuth()
	const [email, setEmail] = React.useState('')
	const [status, setStatus] = React.useState<'idle' | 'submit' | 'success' | 'error'>('idle')
	const [errorMessage, setErrorMessage] = React.useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setStatus('submit')
		const res = await resetPwd(email)
		if (!res.success) {
			setStatus('error')
			setErrorMessage(res.error ?? 'An unexpected error occurred. Please try again later.')
		} else {
			setStatus('success')
		}
	}

	if (status === 'success') {
		return (
			<section className='content-grid text-center'>
				<div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
				     role='alert'>
					<strong className='font-bold'>Instructions sent!</strong>
					<span className='block sm:inline'> We have sent instructions on how to reset your password on the email provided!</span>
				</div>
			</section>
		)
	}

	return (
		<form className='grid gap-5 max-w-3xl mx-auto w-full' onSubmit={handleSubmit}>
			<section className='grid gap-2'>
				<label htmlFor="email" className='font-bold'>Email:</label>
				<input
					type="email"
					id='email'
					name='email'
					value={email}
					className='input rounded'
					placeholder='johndoe@example.com'
					onChange={e => setEmail(e.target.value)}
					required
				/>
			</section>
			{status === 'error' && <p className='text-red-500 py-2 font-bold'>{errorMessage}</p>}
			<button
				className='button bg-sky-700 text-sky-100 py-2 px-4 rounded uppercase font-bold md:w-2/4 hover:bg-sky-950 active:scale-105 disabled:cursor-not-allowed disabled:bg-sky-400 disabled:scale-100'
				disabled={!email.includes('@') || !email.includes('.') || status === 'submit'}
			>{status === 'submit'
				? <SvgLoading/>
				: 'send reset password email'}</button>
		</form>
	)
}
export default ResetPwdForm
