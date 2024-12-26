'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from '@node_modules/next/navigation';
import Cookies from 'js-cookie';

const Nav = () => {
  const [isUserloggedIn, setIsUserloggedIn] = useState();
  const [profileImg, setProfileImg] = useState('/assets/images/logo.svg');
  const [toggleDropdown, settoggleDropdown] = useState(false);
  const pathname = usePathname();
  
  const getImg = () => {
    const cookies = localStorage.getItem('img');
    setProfileImg(cookies);
  }
  
  useEffect(() => {
    const token= localStorage.getItem('loggedIn');
    if(token === 'true'){
      getImg();
      setIsUserloggedIn(true);
    }
    else{
      setIsUserloggedIn(false);
    }
    return
  }, [pathname]);

  const signout = async () => {
    setIsUserloggedIn(false);
    localStorage.clear();
    const response = await fetch('api/signout', {
      method: 'GET'
    });

  }
  
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' alt="Promptopia logo" width={30} height={30} className='object-contain'/>
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {isUserloggedIn ?(
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signout} className='outline_btn'>
              Sign Out
            </button>
            <Link href="/profile">
              <div className='overflow-hidden'>
                <Image src={profileImg} alt="User profile" width={37} height={37} className='custom-position'/>
              </div>
            </Link>
          </div>
        ):  (
          <Link href="/login" className='black_btn'>
            Sign In
          </Link>
      )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {isUserloggedIn? (
          <div className='flex'>
            <div className='overflow-hidden'>
                <Image src={profileImg} alt="User profile" width={37} height={37} className='custom-position' onClick={() => {settoggleDropdown((prev) => !prev)}}/>
            </div>
            {toggleDropdown && (
              <div className='dropdown'>
                <Link href='/profile' className='dropdown_link' onClick={() => settoggleDropdown(false)}>My Profile</Link>
                <Link href='/create-prompt' className='dropdown_link' onClick={() => settoggleDropdown(false)}>Create Prompt</Link>
                <button type='button' onClick={signout} className='mt-5 w-full black_btn'>Sign Out</button>
              </div>
            )}
          </div>
        ):(
          <Link href='/login' className='black_btn'>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
export default Nav;