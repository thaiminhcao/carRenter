"use client";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { useState } from "react";
import SignUpForm from "./SignUpForm";
import { SignInForm } from "./SignInForm";
const NavBar = () => {
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  return (
    <header className='w-full  absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex  justify-end items-center sm:px-16 px-6 py-4 bg-transparent'>

        <div className='flex gap-6 ml-28 '>
          <CustomButton
            title='Sign up'
            btnType='button'
            containerStyles='text-primary-blue rounded-full bg-white min-w-[100px]'
            handleClick={() => setIsOpenRegister(true)}
          />
          <CustomButton
            title='Sign in'
            btnType='button'
            containerStyles='text-primary-blue rounded-full bg-white min-w-[100px]'
            handleClick={() => setIsOpenLogin(true)}
          />
        </div>
        <SignUpForm isOpen={isOpenRegister} closeModal={() => setIsOpenRegister(false)} />
        <SignInForm isOpen={isOpenLogin} closeModal={() => setIsOpenLogin(false)} />
      </nav>
    </header>
  );
};

export default NavBar;
