"use client";
import { Dialog, Transition } from '@headlessui/react';
import { SignUpProps } from '@types';
import { fetchUserLogin } from '@utils';
import Image from 'next/image';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
export const SignInForm = ({ isOpen, closeModal }: SignUpProps) => {
    const { push } = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [, setIsSuccess] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!password || !email) {
            setIsError(true);
            return;
        }

        // Set isLoading to true and start a timer
        setIsLoading(true);
        const timer = setTimeout(() => {
            if (isLoading) {
                // If isLoading is still true after 3 seconds, show a toast
                toast.loading('Please wait a moment while the server starts up');
            }
        }, 3000);

        try {
            const data = await fetchUserLogin(email, password);
            const params = data.authToken.substring(0, data.authToken.indexOf("."))
            // Clear the timer and set isLoading to false
            clearTimeout(timer);
            setIsLoading(false);
            if (data.message === "Sucessful") {
                toast.success('Login successful', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setIsSuccess(true);
                push(`/user/${params}`);
            } else if (data.message === "User doesn't exist") {
                toast.info('Incorrect username or password', {
                    position: toast.POSITION.TOP_RIGHT
                }),
                    setIsSuccess(false);
            } else {

                toast.error('Server is currently busy. Please try again later', {
                    position: toast.POSITION.TOP_RIGHT
                });
                setIsSuccess(false);
            }
        } catch (error) {
            console.error(error);
        }

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
                        <Dialog.Panel className='z-50 relative w-96 p-10 mx-auto mt-60 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                            <button
                                type='button'
                                className='absolute top-0 right-0 mt-4 mr-4 z-50'
                                onClick={closeModal}
                            >
                                <Image src='/close.svg' alt='close' width={20} height={20} className='object-contain' />
                            </button>
                            <div className='flex justify-center'>
                                <form className="space-y-6 w-full py-10 " onSubmit={handleSignIn}>
                                    <h1 className="text-4xl font-semibold mb-8 text-center">Login</h1>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="text"
                                            id="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            className="w-full bg-neutral-100 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="w-full bg-neutral-100 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    {isError && (
                                        <p className="text-red-500">Please fill in all the fields.</p>
                                    )}

                                    <ToastContainer />
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Sign In
                                    </button>
                                    <div className="text-center mt-4">
                                        <button
                                            className="text-blue-500 hover:underline"
                                        >
                                            Don't have an account? Sign up
                                        </button>
                                    </div>
                                </form>
                            </div>





                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>

    )
}
