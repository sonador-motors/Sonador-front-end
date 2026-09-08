'use client'

import React, {useState, useMemo, useEffect} from "react";
import {useAuth} from "@/lib/auth-provider";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import {Autocomplete, TextField, Checkbox, FormControlLabel} from "@mui/material";
import countryList from "react-select-country-list";
import SvgLoading from "@/ui/svgs/svg-loading";
import Link from "next/link"; // Ensure Link is imported
import {useRouter} from "next/navigation";
import AuctionAccess from "@/ui/auction-access";

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const {user, updateUser, loading} = useAuth(); // `user` comes from useAuth context
    const router = useRouter()
    
    // console.log(user)
    
    // Initialize state with default values or empty strings/booleans
    const [otherUserDetails, setOtherUserDetails] = useState({
        title: '',
        country: '',
        port: '',
        mobile_no: '',
        whatsapp: false, // Initialize as a boolean
    });
    const [status, setStatus] = useState<'idle' | 'submit' | 'success' | 'error'>('idle'); // strongly type status
    const [feedback, setFeedback] = useState('');
    
    // Memoize country options as they don't change
    const countryOptions = useMemo(() => countryList().getData(), []);
    
    // Effect to populate form when user data loads or edit mode is enabled
    useEffect(() => {
        if (user) { // Always update initial details if user data changes, regardless of editMode
            setOtherUserDetails({
                title: user.title || '',
                country: user.country || '',
                port: user.port || '',
                mobile_no: user.mobile_no || '',
                whatsapp: typeof user.whatsapp === 'boolean' ? user.whatsapp : false,
            });
        }
    }, [user]); // Depend only on a user object
    
    // Redirect if not authenticated
    useEffect(() => {
        if (loading) return
        if (!user) {
            const timeout = setTimeout(() => {
                router.replace('/account/login')
            }, 2000)
            return () => clearTimeout(timeout)
        }
    }, [loading, user, router])
    
    // Handle form field changes (text, select, checkbox)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        const checked = (e.target as HTMLInputElement).checked; // Cast for checkbox
        setOtherUserDetails(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    
    // Handle Autocomplete country selection
    const handleCountryChange = (_event: React.SyntheticEvent, newValue: { value: string, label: string } | null) => {
        setOtherUserDetails(prevState => ({
            ...prevState,
            country: newValue ? newValue.value : '',
        }));
    };
    
    // Handle PhoneInput changes
    const handlePhoneChange = (phone: string) => {
        setOtherUserDetails(prevState => ({
            ...prevState,
            mobile_no: phone,
        }));
    };
    
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submit');
        setFeedback(''); // Clear previous feedback
        
        try {
            // Only one call to updateUser
            const res = await updateUser(otherUserDetails);
            
            if (!res.success) {
                setStatus('error');
                setFeedback(res.error ?? 'Failed to update user details.');
                setEditMode(true); // Keep form open on error
            } else {
                setStatus('success');
                setFeedback(res.message ?? 'User details updated successfully!');
                setTimeout(() => {
                    setEditMode(false); // Hide edit form on success
                    // Optionally, you might want to re-fetch user data if updateUser
                    // doesn't directly update the `user` state in `useAuth`
                }, 2000);
            }
        } catch (_e) {
            console.error("Error updating user:", _e); // Log the actual error
            setStatus('error');
            setFeedback('An unexpected error occurred. Please try again.');
            setEditMode(true);
        }
    };
    
    // Toggle edit mode
    const handleEdit = () => {
        setEditMode(!editMode);
        // Clear feedback when toggling edit mode
        if (editMode) { // If toggling from edit mode to display mode
            setFeedback('');
            setStatus('idle');
        }
    };
    
    // Find the full country object for the Autocomplete default value
    const selectedCountryObject = useMemo(() =>
            countryOptions.find(option => option.value === otherUserDetails.country),
        [otherUserDetails.country, countryOptions]
    );
    
    // Conditional rendering for the entire component based on `user`
    if (loading || (!user && loading !== false)) {
        return (
            <div className="text-center py-10">
                <p>Loading user profile...</p>
                {/* Or a proper loading spinner/skeletons */}
            </div>
        );
    }
    
    return (
        <div className='bg-sky-100 full py-8 space-y-6'>
            <h1 className='text-3xl text-center uppercase font-black'>
                Welcome to your <span className='text-amber-500'>profile!</span>!
            </h1>
            <section>
                <div
                    className='h-40 w-40 bg-gray-500 mx-auto rounded-full flex items-center justify-center text-4xl font-bold text-gray-100'>
                    {user?.name ? user.name.charAt(0).toUpperCase() : '?'} {/* Display first letter of name */}
                </div>
                <section>
                    <p className='text-center font-bold text-2xl'>{user?.title} {user?.name}</p>
                    <p className='text-center'>{user?.email}</p>
                    <section className='grid my-4 sm:grid-cols-3 gap-2 text-center max-w-screen-md mx-auto'>
                        <p className='bg-sky-600 py-2 text-sky-50 rounded-md'>{user?.country}</p>
                        <p className='bg-sky-600 py-2 px-2 text-center text-sky-50 rounded-md'>+{user?.mobile_no}</p>
                        <p className='bg-sky-600 py-2 text-sky-50 rounded-md'>{user?.port}</p>
                    </section>
                </section>
                <section>
                    {/* Edit Form Section */}
                    {editMode && (
                        <section className='bg-blue-100 full py-10'>
                            <form className='grid gap-4' onSubmit={handleSubmit}>
                                <h2 className='text-center text-xl font-bold'>Please update your profile!</h2>
                                <section className=' grid gap-4 md:grid-cols-2'>
                                    <div className="grid gap-2">
                                        <label htmlFor="title" className="font-bold">Title:</label>
                                        <select
                                            className="border border-blue-600 rounded p-2 bg-transparent font-bold focus:outline-none"
                                            id='title'
                                            name='title'
                                            onChange={handleChange}
                                            value={otherUserDetails.title}
                                        >
                                            <option value="">Select Title</option>
                                            <option value='Mr'>Mr</option>
                                            <option value='Mrs'>Mrs</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={otherUserDetails.whatsapp}
                                                    onChange={handleChange}
                                                    name="whatsapp"
                                                />
                                            }
                                            label={<span className="font-bold">Do you use WhatsApp?</span>}
                                        />
                                    </div>
                                </section>
                                <Autocomplete
                                    options={countryOptions}
                                    getOptionLabel={(option) => option.label}
                                    value={selectedCountryObject || null}
                                    onChange={handleCountryChange}
                                    renderInput={(params) => <TextField {...params} label='Country' required/>}
                                />
                                <section className='grid gap-4'>
                                    <div className="grid gap-2">
                                        <label className="font-bold">Phone number:</label>
                                        <PhoneInput
                                            country={otherUserDetails.country ? otherUserDetails.country.toLowerCase() : 'us'}
                                            value={otherUserDetails.mobile_no}
                                            onChange={handlePhoneChange}
                                            containerStyle={{width: '100%'}}
                                            inputStyle={{
                                                width: '100%',
                                                border: '1px solid blue',
                                                background: 'transparent',
                                            }}
                                            buttonStyle={{
                                                border: '1px solid blue',
                                                background: 'transparent',
                                            }}
                                            inputProps={{
                                                name: 'mobile_no',
                                                required: true,
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="port" className="font-bold">Nearest Destination
                                            Port:</label>
                                        <input
                                            type="text"
                                            className="border border-blue-600 rounded p-2 bg-transparent font-bold focus:outline-none"
                                            id='port'
                                            placeholder='Your nearest destination port'
                                            name='port'
                                            value={otherUserDetails.port}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </section>
                                {status === 'error' && <p className='text-red-500'>{feedback}</p>}
                                <button
                                    className='w-full bg-sky-700 text-sky-100 font-semibold py-2 disabled:bg-gray-400 rounded uppercase md:w-1/6 hover:bg-sky-950 active:scale-105'
                                    disabled={status === 'submit' || !otherUserDetails.title || !otherUserDetails.port || !otherUserDetails.country}
                                    type="submit"
                                >
                                    {status === 'submit' ? <SvgLoading/> : 'Update Profile'}
                                </button>
                            </form>
                        </section>
                    )}
                    {/* Toggle Edit Form Button */}
                    <section className='w-full text-center'>
                        <button
                            className=" w-full bg-orange-200 text-orange-800 py-2 disabled:bg-gray-400 rounded uppercase md:w-1/5 hover:bg-orange-600 hover:text-orange-100 active:scale-105 font-semibold transition-colors ease-in border border-orange-900"
                            onClick={handleEdit}
                        >
                            {editMode ? 'Hide Edit Form' : 'Edit Profile'}
                        </button>
                    </section>
                    {/* Success Feedback Message */}
                    {status === 'success' && (
                        <section className='content-grid text-center'>
                            <p className='font-bold text-green-700 py-10 uppercase'>{feedback}</p>
                        </section>
                    )}
                </section>
                {/*Auction Access*/}
                <AuctionAccess />
                {/* Important Reference Information */}
                <section className='grid gap-8 md:grid-cols-2 items-start'>
                    <section className='grid gap-2'>
                        <h2 className='text-lg text-center uppercase font-bold text-sky-600 border-b-2 border-b-sky-500 mb-2'>Important
                            Reference Information</h2>
                        <Link href='/auction-sheet' className='bg-blue-200 text-center py-2 rounded-full font-bold'>
                            Understanding The Auction Inspection Sheet
                        </Link>
                        <Link href='/timetable'
                              className='bg-amber-200 text-center py-2 rounded-full font-bold text-amber-900'>
                            Japanese Auctions Timetable
                        </Link>
                        <Link href='/year-made'
                              className='bg-sky-700 text-center py-2 rounded-full font-bold text-sky-100 px-2'>
                            Registration Manufacturer Year Difference
                        </Link>
                    </section>
                    <section className='grid gap-2'>
                        <h2 className='text-lg text-center uppercase font-bold text-sky-600 border-b-2 border-b-sky-500 mb-2'>Service
                            Terms and Conditions</h2>
                        <Link href='/t&s/service' className='bg-blue-200 text-center py-2 rounded-full font-bold'>
                            Company Service Rules
                        </Link>
                    </section>
                    <section className='grid gap-2'>
                        <h2 className='text-lg text-center uppercase font-bold text-amber-600 border-b-2 border-b-amber-500 mb-2'>My
                            balance</h2>
                        <p className='text-center text-2xl'>
                            {user?.balance === null ? 0 : user?.balance}¥
                        </p>
                        <button className='text-sky-700 bg-sky-100 border font-bold text-sm border-sky-700 py-2 capitalize rounded'>Request for invoice via contact form or WhatsApp
                        </button>
                        <small className='font-bold uppercase text-xs text-gray-500 text-center md:text-left'>All you need is to provide the Stock, Lot / Chassis No. of the car you want or even just UPDATE your BALANCE for future purchases.</small>
                    </section>
                    <section className='grid gap-2'>
                        <h2 className='text-lg text-center uppercase font-bold text-amber-600 border-b-2 border-b-amber-500 mb-2'>My
                            Orders</h2>
                        <p className='text-lg font-bold text-sky-500 text-center md:text-left'>No orders</p>
                    </section>
                </section>
                {/* My Shipping Links Section */}
                {user?.shipping_links && user?.shipping_links.length > 0 && (
                    <section className="my-10">
                        <h2 className="text-lg text-center uppercase font-bold text-sky-600 border-b-2 border-b-sky-500 mb-2 md:col-span-2">
                            My Shipping Links
                        </h2>
                        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                            {user?.shipping_links.map((linkObj) => (
                                <div
                                    key={linkObj.id}
                                    className="bg-white shadow-md border border-gray-300 rounded p-4 flex flex-col items-center text-center"
                                >
                                    <p className="font-bold uppercase text-sky-700 mb-2">
                                        {linkObj.description || "Shipping Link"}
                                    </p>
                                    <Link
                                        href={linkObj.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline font-semibold break-all hover:text-blue-800 transition underline-offset-4"
                                    >
                                        Track Your Container / Shipment →
                                    </Link>
                                </div>
                            ))}
                        </section>
                    </section>
                )}
                <em className='mt-10 font-bold text-center inline-block text-amber-800'>The page is going to be receiving regular updates...</em>
            </section>
        </div>
    );
};

export default Profile;