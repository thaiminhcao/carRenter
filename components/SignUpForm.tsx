"use client";
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import React, { useState } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUserRegister } from '@utils';
import { DataLoginProps, SignUpProps } from '@types';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


const SignUpForm = ({ isOpen, closeModal }: SignUpProps) => {
    const genders = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState<{ value: string; label: string } | null>(null);
    const [dob, setDob] = useState<Date | null>(null);
    const minDate = new Date('1900-01-01');
    const maxDate = new Date();

    const [phoneNumber, setPhone] = useState<number | undefined>();
    const [isError, setIsError] = useState(false);
    const [, setIsSuccess] = useState(false);

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password || !email || !gender || !dob || !phoneNumber) {
            setIsError(true);
            return;
        }

        const userData: DataLoginProps = {
            username,
            password,
            email,
            phoneNumber,
            gender: gender ? gender.value : null,
            dob: Number(dob),
        };

        fetchUserRegister(userData)
            .then((res) => {
                if (res == null) {
                    throw new Error('Please wait a moment while the server starts up');
                }
                return res.json();
            })
            .then((data) => {
                if (data.message === 'Email already exist') {
                    toast.success('Email already exists', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setIsSuccess(false);
                } else {
                    toast.success('Registration successful', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setIsSuccess(true);
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Server is currently busy. Please try again later', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setIsSuccess(false);
            });
        console.log(email)
    };

    return (
        <Transition appear show={isOpen} as='div'>
            <Dialog className='fixed inset-0 z-50 overflow-y-auto ' onClose={closeModal}>
                <div className='flex items-center justify-center text-center '>
                    <Transition.Child
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>
                    <Transition.Child
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-75'
                        enterTo='opacity-100 scale-100'
                        leave='ease-out duration-300'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-75'
                    >
                        <Dialog.Panel className='z-50 w-96 relative p-10 mx-auto mt-36 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                            <button
                                type='button'
                                className='absolute top-0 right-0 mt-4 mr-4 z-50'
                                onClick={closeModal}
                            >
                                <Image src='/close.svg' alt='close' width={20} height={20} className='object-contain' />
                            </button>
                            <form onSubmit={handleSignUp}>
                                <h2 className='text-2xl font-semibold mb-6 text-center'>Sign Up</h2>
                                <div className='mb-4'>
                                    <label htmlFor='username' className='block text-gray-700 font-medium mb-2'>
                                        Username
                                    </label>
                                    <input
                                        type='text'
                                        id='username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className='w-full bg-neutral-100 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                                        placeholder='Enter your username'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='password' className='block text-gray-700 font-medium mb-2'>
                                        Password
                                    </label>
                                    <input
                                        type='password'
                                        id='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='w-full bg-neutral-100 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                                        placeholder='Enter your password'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='email' className='block text-gray-700 font-medium mb-2'>
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='w-full bg-neutral-100 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                                        placeholder='Enter your email'
                                    />

                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='phoneNumber' className='block text-gray-700 font-medium mb-2'>
                                        Phone Number
                                    </label>
                                    <input
                                        type='tel'
                                        value={phoneNumber}
                                        onChange={(e) => setPhone(Number(e.target.value))}
                                        placeholder='Enter your phone number'
                                        className='w-full bg-neutral-100 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='gender' className='block text-gray-700 font-medium mb-2'>
                                        Gender
                                    </label>
                                    <Select

                                        id='gender'
                                        value={gender}
                                        onChange={(selectedOption) => setGender(selectedOption)}
                                        options={genders}
                                        className='w-full bg-neutral-100 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                                        placeholder='Select your gender'
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor='dob' className='block text-gray-700 font-medium mb-2'>
                                        Date of Birth
                                    </label>
                                    <DatePicker

                                        showYearDropdown
                                        yearDropdownItemNumber={10}
                                        selected={dob}
                                        showIcon
                                        onChange={(date: Date | null) => setDob(date)}
                                        className="w-full bg-neutral-100 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        dateFormat={'dd/MM/yyyy'}
                                        minDate={minDate}
                                        maxDate={maxDate}
                                    />

                                </div>
                                {isError && <p className='text-red-500'>Please fill in all the fields.</p>}
                                <ToastContainer />
                                <div className='mt-4'>
                                    <button
                                        type='submit'
                                        className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <div className='text-center mt-4'>
                                    <button className='text-blue-500 hover:underline'>
                                        Already have an account? Sign in
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SignUpForm;
