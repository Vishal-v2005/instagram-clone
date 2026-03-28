import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ViewStory() {

  const { id } = useParams();
  const storyId = Number(id);

  const [story, setStory] = useState(null);
  const [allStories, setAllStories] = useState([]);

  const navigate = useNavigate();

  
  useEffect(() => {
    fetch("http://localhost:3000/stories")
      .then(res => res.json())
      .then(data => setAllStories(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/stories/${storyId}`)
      .then(res => res.json())
      .then(data => setStory(data))
      .catch(err => console.log(err));
  }, [storyId]);

  
  useEffect(() => {
    if (allStories.length > 0 && storyId > allStories.length) {
      navigate('/');
    }
  }, [storyId, allStories, navigate]);

  
  useEffect(() => {
    if (allStories.length === 0) return;

    const timer = setTimeout(() => {
      if (storyId < allStories.length) {
        navigate(`/story/${storyId + 1}`);
      } else {
        navigate('/'); 
      }
    }, 3000); 

    return () => clearTimeout(timer);
  }, [storyId, allStories, navigate]);

 
  const prevId = storyId > 1 ? storyId - 1 : 1;

  return (
    <div>
      {story ? (
        <div className='d-flex justify-content-center align-items-center gap-3'>

         
          <Link to={`/story/${prevId}`}>
            <i className="bi bi-arrow-left-circle-fill fs-1"></i>
          </Link>

          
          <img
            className='vh-100 view'
            src={story.image}
            alt="story"
          />

          
          <Link to={
            storyId < allStories.length
              ? `/story/${storyId + 1}`
              : `/`
          }>
            <i className="bi bi-arrow-right-circle-fill fs-1"></i>
          </Link>

        </div>
      ) : (
        <h1>Loading.....</h1>
      )}
    </div>
  );
}

export default ViewStory;