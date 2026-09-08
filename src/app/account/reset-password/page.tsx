import React from 'react'
import ResetPwdForm from "@/ui/forms/reset-pwd-form";

const ResetPassword = () => {
	return (
		<main className='content-grid space-y-5 md:space-y-10 mb-10'>
			<section className='bg-sky-700 full text-sky-100 py-10 text-center md:text-justify'>
				<h1 className='text-3xl font-black'>Reset Your <span className='uppercase text-amber-300'>Password</span></h1>
				<em>A password reset email is going to be sent, so be sure to check your email, if you don&apos;t see the email be sure to check in the junk folder as well, If the problems persist, be sure to reach us out.</em>
			</section>
			<ResetPwdForm/>
		</main>
	)
}
export default ResetPassword
