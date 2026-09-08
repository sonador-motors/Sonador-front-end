import React from 'react'
import LoginForm from "@/ui/forms/login";

const Login = () => {
	return (
		<main className='mb-10 space-y-5 md:space-y-10 content-grid'>
			<section className='bg-sky-700 full text-sky-100'>
				<h1 className='text-5xl uppercase py-10 font-bold text-center'>Login Into Your Account</h1>
			</section>
			<LoginForm/>
		</main>
	)
}
export default Login
