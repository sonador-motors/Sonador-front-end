
import React from 'react'
import Signup from "@/ui/forms/signup";

const Register = () => {
	return (
		<main className='content-grid space-y-10 mb-10'>
			<section className='bg-sky-700 full text-sky-100 py-10 space-y-4'>
				<h1 className='text-center text-lg font-bold'>SIGN UP FOR AN ACCOUNT</h1>
				<small className='text-white'><em>Sorry for any inconviniences caused</em></small>
				<em>Signing up for an account enables you see all the details of the current cars available in auctions, their status whether they&apos;re SOLD, NOT SOLD or REMOVED.</em>
				<em>Enables you having timely access to our sales representative providing you all the details you might need.</em>
			</section>
			<Signup/>
		</main>
	)
}
export default Register
