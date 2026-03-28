import React, { useEffect, useState } from 'react'

function Posts() {

  const [posts, setposts] = useState([])
  const [likedPosts, setLikedPosts] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => setposts(data))
      .catch(err => console.log(err))
  }, [])


  const handleLike = (id) => {
    setposts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === id) {
          const isLiked = likedPosts.includes(id)

          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1
          }
        }
        return post
      })
    )


    setLikedPosts((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : [...prev, id]
    )
  }

  return (
    <div className='d-flex justify-content-center '>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div className='my-3' key={post.id}>


              <div className='d-flex align-items-center my-2'>
                <img className='rounded-circle dp ' src={post.profilePic} alt="img" />
                <h5 className='ms-2'>{post.username}</h5>
              </div>


              <img
                className='post'
                src={post.image}
                alt=""
                onDoubleClick={() => handleLike(post.id)}
                style={{ cursor: "pointer" }}
              />


              <div>
                <i
                  className={`bi ${likedPosts.includes(post.id)
                    ? "bi-heart-fill text-danger"
                    : "bi-heart"
                    }`}
                  onClick={() => handleLike(post.id)}
                  style={{ cursor: "pointer", marginRight: "10px" }}
                ></i>

                <i className="bi bi-chat" style={{ marginRight: "10px" }}></i>
                <i className="bi bi-send"></i>
              </div>


              <div>
                <b>{post.likes} likes</b>
              </div>


              <p>
                <b>{post.username}</b> {post.caption}
              </p>


            </div>


          )
          )
          }
          <div>
           <h6 className='loading'>Loading....</h6>
          </div>

        </div>
      ) : (
        <div>Loading...</div>
      )}

    </div>
  )
}

export default Posts