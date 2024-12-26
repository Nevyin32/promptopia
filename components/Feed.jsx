'use client';
import { useState, useEffect } from "react"
import Cookies from 'js-cookie';
import PromptCard from "./PromptCard";
import { usePathname } from "@node_modules/next/navigation";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleTagClick, handleClick }) => {
  return (
    <>
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard key={post._id} post={post} handleClick={handleClick} handleTagClick={handleTagClick} />
        ))}
      </div>
    </>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    setPosts(data);
  }

  const handleClick = (e) => {
    router.push(`/profile/${e._id}?name=${e.username}`);
  }
  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 100)
    );
  };

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    const newPosts = posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
    return newPosts;
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  
  useEffect(() => {
    const cookie = Cookies.get('clear-localStorage');
    if(cookie === 'true'){
      return;
    }
    else if(cookie === 'false'){
      fetchPosts();
    }
  }, [])
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} className="search_input peer" required/>
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleClick={handleClick}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleClick={handleClick} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed