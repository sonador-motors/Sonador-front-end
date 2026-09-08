import React from 'react'

export const metadata = {
    title: {
		default: 'Manage Your Account',
	    template: '%s | Sonador Motors Co.,Ltd'
    },
    description: 'As a registered user of Sonador Motors, you can manage your account and enjoy the benefits of buying a used car from Japan with us. You can view your profile, edit your personal information, change your password, and update your preferences. You can also view your order history, track your shipment, and download your invoices and documents. You can also access our exclusive offers, discounts, and rewards, and join our loyalty program. You can also contact our customer service and support team anytime you need help or guidance. To access your account, please enter your username and password below. If you don’t have an account yet, you can sign up for free and start your journey with us.',
}

const Layout = ({children}: {children: React.ReactNode}) => {
	return (
		<>
			{children}
		</>
	)
}

export default Layout