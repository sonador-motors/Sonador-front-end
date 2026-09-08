'use client'
import React from 'react'
import {useAuth} from "@/lib/auth-provider";
import SvgLoading from "@/ui/svgs/svg-loading";
import Link from "next/link";

const Login = () => {
	const [formData, setFormData] = React.useState({
		email: '',
		password: ''
	})
	const {login} = useAuth()
	const [status, setStatus] = React.useState('idle')
	const [showPassword, setShowPassword] = React.useState(false)
	const [errorMessage, setErrorMessage] = React.useState('')
	// console.log(formData)

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setStatus('submit')
		const res = await login(formData)
		if(!res.success) {
		   setStatus('error')
		   setErrorMessage(`${res.error}`)
		}
	}

	const handleToggleShowPassword = () => setShowPassword(prevState => !prevState)


	return (
		<section className='sm:border border-sky-600 max-w-3xl mx-auto sm:p-4 w-full grid gap-2'>
			<form onSubmit={handleSubmit} method='POST'
			      className='my-10 gap-4 grid'>
				<section className='grid gap-2'>
					<label htmlFor="email">Email:</label>
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
					<label htmlFor="password">Password:</label>
					<input
						type={showPassword ? 'text' : 'password'}
						id='password'
						name='password'
						value={formData.password}
						className='input rounded'
						placeholder='Enter the password associated with your account'
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
				{status === 'error' && <p className='text-red-500 font-bold'>{errorMessage}</p>}
				<button
					className='button bg-sky-700 text-sky-100 py-2 rounded uppercase font-bold md:w-1/6 hover:bg-sky-950 active:scale-105 disabled:bg-sky-500 disabled:cursor-not-allowed'
					disabled={status === 'submit' || !formData.email || !formData.password}
				>{status === 'submit' ? <SvgLoading/> : 'login'}</button>
			</form>

			<em><Link href="/account/reset-password" className='font-bold underline'>Forgot Password ?</Link> </em>
			<em>Don&apos;t have an account? <Link href="/account/signup" className='uppercase font-bold underline'>signup
				here</Link> </em>
		</section>
	)
}
export default Login