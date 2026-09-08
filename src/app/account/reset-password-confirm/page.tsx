'use client'

import dynamic from 'next/dynamic'

const ResetPwdConfirm = dynamic(() => import('@/ui/forms/reset-pwd-confirm'), {ssr: false})

const ResetPasswordConfirm = () => {
	return (
		<main className='content-grid'>
			<section className='bg-sky-700 full uppercase text-sky-100 py-10 text-center flex flex-col justify-center items-center'>
				<h1 className='text-3xl font-thin'>Create New <span
					className='text-amber-300 font-black'>Password</span></h1>
			</section>
			<ResetPwdConfirm/>
		</main>
	)
}
export default ResetPasswordConfirm
