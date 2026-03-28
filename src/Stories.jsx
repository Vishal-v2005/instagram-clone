import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Stories() {
  const [stories, setstories] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/stories")
      .then((response) => response.json())
      .then((data) => setstories(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='story d-flex'>
      {stories.length > 0 ? (
        stories.map((story) => (
          <div key={story.id} className='ms-2 'onClick={()=>{navigate(`/story/${story.id}`)}}>
            <div className='gradient-border'>
              <img src={story.profilePic} alt="dp" className='story-dp rounded-circle  ' />
            </div>

            <p className='text-truncate' style={{ width: "50px" }}>{story.username}</p>

          </div>
        ))
      ) : (
        <p>loading.....</p>
      )}
    </div>
  );
}

export default Stories;