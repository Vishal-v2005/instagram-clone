import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Suggestions() {
  const [profile, setprofile] = useState({})
  const [suggestions, setsuggestions] = useState([])
  const [followers, setFollowers] = useState([])
  const [change, setchange] = useState(false)

  useEffect(() => {
    // Fetch profile
    fetch("http://localhost:3000/profile")
      .then(res => res.json())
      .then(data => setprofile(data))
      .catch(err => console.log(err))

    // Fetch suggestions
    fetch("http://localhost:3000/suggestion")
      .then(res => res.json())
      .then(data => setsuggestions(data))
      .catch(err => console.log(err))

    // Fetch followers
    fetch("http://localhost:3000/followers")
      .then(res => res.json())
      .then(data => setFollowers(data))
      .catch(err => console.log(err))

  }, [change])

  // ✅ Check if already followed
  const isFollowed = (id) => {
    return followers.some(user => user.id === id)
  }

  // ✅ Toggle Follow / Unfollow
  const handleToggleFollow = async (id, username) => {
    try {
      if (isFollowed(id)) {
        // 🔴 Unfollow
        await axios.delete(`http://localhost:3000/followers/${id}`)
        

        // update UI instantly
        setFollowers(prev => prev.filter(user => user.id !== id))

      } else {
        // 🟢 Follow
        await axios.post('http://localhost:3000/followers', {
          id,
          username
        })
        

        // update UI instantly
        setFollowers(prev => [...prev, { id, username }])
      }

      setchange(!change)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {/* Profile */}
      <div className='suggestion w-75 m-5'>
        <div className='d-flex align-items-center'>
          <img
            className='rounded-circle sugdp'
            src={profile.profilePic}
            alt="img"
          />
          <h5 className='ms-2'>{profile.username}</h5>
          <small className='ms-auto text-info' style={{ cursor: "pointer" }}>
            Switch
          </small>
        </div>

        <div className='d-flex mt-3'>
          <p>Suggested for you</p>
          <b className='ms-auto'>See All</b>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 ? (
        <div className='ms-5 w-75'>
          {suggestions.map((suggestion) => (
            <div className='my-2' key={suggestion.id}>
              <div className='d-flex align-items-center'>
                <img
                  className='rounded-circle dp'
                  src={suggestion.profilePic}
                  alt="img"
                />
                <h5 className='ms-2'>{suggestion.username}</h5>

                {/* 🔥 Toggle Button */}
                <a
                  className={`ms-auto link ${
                    isFollowed(suggestion.id)
                      ? "btn-secondary"
                      : "btn-primary"
                  }`}
                  onClick={() =>
                    handleToggleFollow(
                      suggestion.id,
                      suggestion.username
                    )
                  }
                >
                  {isFollowed(suggestion.id)
                    ? "Unfollow"
                    : "Follow"}
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='ms-5'>Loading...</div>
      )}
    </div>
  )
}

export default Suggestions