'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Nav = () => {

  const isUserloggedIn = false;
  const [toggleDropdown, settoggleDropdown] = useState(false)

  
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' alt="Promptopia logo" width={30} height={30} className='object-contain'/>
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {isUserloggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>
            <button type='button' className='outline_btn'>
              Sign Out
            </button>
            <Link href="/profile">
              <Image src='/assets/images/logo.svg' alt="User profile" width={37} height={37} className='rounded-full'/>
            </Link>
          </div>
        ): (
            <Link href="/login" className='black_btn'>
              Sign In
            </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {isUserloggedIn? (
          <div className='flex'>
            <Image src='/assets/images/logo.svg' alt="User profile" width={37} height={37} className='rounded-full' onClick={() => {settoggleDropdown((prev) => !prev)}}/>
            {toggleDropdown && (
              <div className='dropdown'>
                <Link href='/profile' className='dropdown_link' onClick={() => settoggleDropdown(false)}>My Profile</Link>
                <Link href='/create-prompt' className='dropdown_link' onClick={() => settoggleDropdown(false)}>Create Prompt</Link>
                <button type='button' onClick={() => {settoggleDropdown(false); signOut()}} className='mt-5 w-full black_btn'>Sign Out</button>
              </div>
            )}
          </div>
        ):(
          <button type='button' className='black_btn'>
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}

export default Nav