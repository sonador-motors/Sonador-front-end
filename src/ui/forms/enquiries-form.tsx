'use client'

import 'react-phone-input-2/lib/style.css'
import PhoneInput from "react-phone-input-2";
import {Autocomplete, TextField} from "@mui/material";
import countryList from 'react-select-country-list'
import React from "react";
import SvgLoading from "@/ui/svgs/svg-loading";
import {useAuth} from "@/lib/auth-provider";
import {CarType} from "@/lib/car-context";

// Re-importing PhoneInput types
import type {CountryData} from "react-phone-input-2";
import {useCif} from "@/context/cif-context";

// No longer need PhoneInputInstanceMethods if not using ref methods
// interface PhoneInputInstanceMethods {
//     updateCountry: (countryCode: string) => void;
// }

type EnquiryFormData = {
    address?: boolean
    notificationMessage?: string
    port?: string
    selectedCountry?: string
    car?: CarType
    isAddress?: boolean
}

// Directly use the CountryData interface from your provided `react-select-country-list` types
type CountryOption = {
    value: string;
    label: string;
}

const EnquiresForm: React.FC<EnquiryFormData> = ({address, notificationMessage, car}) => {
    const {user} = useAuth()
    const [phone, setPhone] = React.useState<string>('')
    const [country, setCountry] = React.useState<string>('') // Stores the country code (e.g., 'us', 'gb')
    const [phoneCountry, setPhoneCountry] = React.useState<string>('')
    const [formData, setFormData] = React.useState({
        name: user?.name || '',
        email: user?.email || '',
        phoneNo: user?.mobile_no || '',
        country: user?.country || '',
        address: '',
        port: user?.port || '',
        enquiry: '',
        car: car || '',
        isAddress: address || false,
    })
    const [feedback, setFeedback] = React.useState<string>('')
    const options: CountryOption[] = React.useMemo(() => countryList().getData(), [])
    
    // Removed the ref:
    // const phoneInputRef = React.useRef<PhoneInputInstanceMethods>(null);
    
    const [status, setStatus] = React.useState<'idle' | 'submit' | 'error' | 'success'>('idle')
    
    formData.country = country
    formData.phoneNo = phone
    
    // React.useEffect(() => {
    //     // This useEffect block is now primarily for populating from user data
    //     // The `phoneInputRef.current.updateCountry` call is no longer needed here
    //     // because the `country` prop on PhoneInput will handle the update.
    //     if (user) {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             name: user.name || '',
    //             email: user.email || '',
    //             phoneNo: user.mobile_no || '',
    //             country: user.country || '',
    //             port: user.port || '',
    //         }));
    //         setPhone(user.mobile_no || '');
    //         setCountry(user.country || '');
    //     }
    // }, [user]); // Only 'user' is a dependency now
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    
    const handlePhoneChange = (
        value: string,
        data: CountryData
    ) => {
        setPhone(value);
        // Keep this logic: If the user changes the country in the PhoneInput dropdown,
        // it should update your `country` state for consistency with Autocomplete.
        if (typeof data === 'object' && data !== null && 'countryCode' in data) {
            setPhoneCountry(data.countryCode)
            setCountry(data.countryCode.toUpperCase());
        }
    };
    
    const handleCountryChange = (_: React.SyntheticEvent, value: CountryOption | null) => {
        if (value) {
            setCountry(value.value); // This will cause PhoneInput to re-render with the new country prop
            setPhoneCountry(value.value.toLowerCase())
        } else {
            setCountry('');
            setPhoneCountry('')
        }
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setStatus('submit')
        e.preventDefault()
        const res = await fetch(
            '/api/enquiries',
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        const response = await res.json()
        if (!response.success) {
            setStatus('error')
            setFeedback(response.error)
        } else {
            setStatus('success')
            setFeedback(response.message)
            setFormData({
                name: '',
                email: '',
                phoneNo: phone,
                country: country,
                port: '',
                enquiry: '',
                address: '',
                car: car || '',
                isAddress: address || false,
            })
        }
    }
    
    if (status === 'success') {
        return (
            <section className='content-grid text-center'>
                <div className='bg-green-100 border border-green-400  my-8 text-green-700 px-4 py-3 rounded relative uppercase'
                     role='alert'>
                    <strong className='font-bold'>Success!</strong>
                    <span className='block sm:inline'> Your enquiry has been sent successfully. Our representative will get in touch with you as soon as possible. Thank you!</span>
                </div>
            </section>
        )
    }
    
    return (
        <form className='grid gap-4 mt-4 mb-2' onSubmit={handleSubmit}>
            {
                <>
                    <em className='text-red-600 text-center font-semibold'>**{notificationMessage ? notificationMessage : 'please use the form below to contact us, all fields are mandatory.'}**</em>
                    <section className='grid gap-2 md:grid-cols-2'>
                        <div className="grid gap-2">
                            <label htmlFor="name" className="font-bold uppercase">Name:</label>
                            <input type="text"
                                   className="border-2 border-black rounded p-4 bg-transparent  font-bold focu focus:outline-none"
                                   id='name'
                                   placeholder='John Doe'
                                   name='name'
                                   value={formData.name}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="email" className="font-bold uppercase">Email:</label>
                            <input type="text"
                                   className="border-2 border-black rounded p-4 bg-transparent  font-bold focus:outline-none"
                                   id='email'
                                   placeholder='johndoe@gmail.com'
                                   name='email'
                                   value={formData.email}
                                   onChange={handleChange}
                            />
                        </div>
                    </section>
                    <Autocomplete<CountryOption, false, false, false>
                        renderInput={params => <TextField {...params} label='Country'/>}
                        options={options}
                        getOptionLabel={option => option.label}
                        onChange={handleCountryChange}
                        value={options.find(option => option.value === country) || null}
                    />
                    <section className='w-full grid gap-2 md:grid-cols-2'>
                        <div className="grid gap-2">
                            <label className="font-bold uppercase">Phone number:</label>
                            <PhoneInput
                                // No ref needed here!
                                value={phone}
                                onChange={handlePhoneChange}
                                country={country.toLowerCase()} // This prop handles the country update
                                containerStyle={{
                                    border: '2px solid #000000',
                                    display: 'flex',
                                    gap: '2rem',
                                    justifyContent: 'space-between',
                                    padding: '.5rem',
                                    borderRadius: '.25rem',
                                    backgroundColor: 'transparent',
                                    fontWeight: 'bold',
                                }}
                                inputStyle={{
                                    border: 'none',
                                    background: 'transparent',
                                    width: '100%',
                                    fontWeight: 'bold',
                                    outline: 'none',
                                }}
                                buttonStyle={{
                                    border: 'none',
                                    borderRight: '2px solid #000000',
                                    backgroundColor: 'transparent',
                                }}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="port" className="font-bold uppercase">Port:</label>
                            <input type="text"
                                   className="border-2 border-black rounded p-4 bg-transparent  font-bold focus:outline-none"
                                   id='port'
                                   placeholder='Your nearest destination port'
                                   name='port'
                                   value={formData.port}
                                   onChange={handleChange}
                                   required
                            />
                        </div>
                    </section>
                    {address && <div className="flex flex-col w-full gap-2">
                        <label htmlFor="address" className="font-bold uppercase">Address:</label>
                        <input type="text"
                               className="border-2 border-black rounded p-4 bg-transparent  font-bold focus:outline-none"
                               id='address'
                               placeholder='Street, Town, Province'
                               name='address'
                               value={formData.address}
                               onChange={handleChange}
                               required
                        />
                    </div>}
                </>}
            {(user || !address )&&
				<div className='grid gap-2'>
					<label htmlFor="enquiry" className="font-bold uppercase">Enquiry:</label>
					<textarea name="enquiry" id="enquiry" rows={5}
					          className='bg-transparent border-2 border-black focus:outline-none p-4'
					          value={formData.enquiry}
					          onChange={handleChange}
					          placeholder='Any general questions are welcome, and we will be happy to answer any questions as soon as possible!'
					          required
					></textarea>
				</div>}
            {status === 'error' && <p className='text-red-500'>{feedback}</p>}
            <button
                disabled={status === "submit"}
                className={`
                    w-full py-4 rounded-md uppercase font-extrabold
                    transition-all ease-in-out duration-200 active:scale-[0.97]
                    flex items-center justify-center gap-2
                    
                    ${status === "submit"
                        ? "bg-blue-900/40 text-blue-100 cursor-not-allowed"
                        : !address
                        ? "bg-red-100 text-red-600 hover:bg-red-600 hover:text-red-100 border-2 border-red-600"
                        : "bg-amber-100 text-amber-700 border-2 border-amber-600 hover:bg-amber-600 hover:text-amber-100"
                    }
                `}
            >
                {status === "submit" && !address ? (
                    <SvgLoading />
                ) : address ? (
                    "Proceed with invoice request"
                ) : (
                    "Submit Enquiry"
                )}
            </button>
        </form>
    )
}

export default EnquiresForm