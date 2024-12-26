'use client'
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';
import { useParams } from 'next/navigation';


const profile = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const userId = params?.id
  const [mainUserID, setMainUserID] = useState();
  const [posts, setPosts] = useState([]);
  const userName = searchParams.get("name");
  
  const getLocalStorage = () => {
    if (!mainUserID) {
      setMainUserID(window.localStorage.getItem('userId'));
    }
  }

  getLocalStorage();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    }
    if (userId != mainUserID) {
      fetchPosts();
    }else{
      router.push('/profile');
    }
  }, [pathname, userId])
  return (
    <>
      <Profile name={userName} desc={`Welcome to ${userName} personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`} data={posts} loggedIn={userId} />
    </>
  )
}

export default profile