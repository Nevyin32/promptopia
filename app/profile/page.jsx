'use client'
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Profile from '@components/Profile';

const profile = () => {
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  const getLocalStorage = () => {
    if (!userId) {
      setUserId(window.localStorage.getItem('userId'));
    }
  }

  useEffect(() => {
    getLocalStorage();
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    }
    if (userId) {
      fetchPosts();
    }
  }, [pathname, userId])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasconfirm = window.confirm('Are you sure you want to delete this prompt?');

    if (hasconfirm) {
      try{
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPost = posts.filter((p) => {
          p._id === post._id
        })
        setPosts(filteredPost);
      }catch(error){
        console.log(error);
      }
    }
  }
  return (
    <>
      <Profile name="My" desc="Welcome to your personalized profile page" data={posts} handleEdit={handleEdit} loggedIn={userId} handleDelete={handleDelete} />
    </>
  )
}

export default profile