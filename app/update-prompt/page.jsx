'use client';
import {useState, useEffect} from 'react';
import Form from '@components/Form';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const Main = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:'',
    })
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'GET',
            });
            if(response.ok){
                const data = await response.json();
                setPost({prompt: data.prompt, tag: data.tag});
            }
        }
        if(promptId){
            getPromptDetails();
        }
    }, [promptId])
    
    const EditPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId){ return alert("No prompt id")}
        
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });
            if(response.ok){
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        }finally{
            setSubmitting(false);
        }
    }
    
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={EditPrompt}
        />
    )
}
function EditPrompt() {
    return (
      // You could have a loading skeleton as the `fallback` too
      <Suspense>
        <Main />
      </Suspense>
    )
  }
export default EditPrompt