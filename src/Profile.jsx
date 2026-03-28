import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {

    const [profile, setprofile] = useState(null);
    const [followers,setfollowers]=useState([]);
    const [unfollow,setunfollow]=useState(0);

    useEffect(() => {
        axios.get('http://localhost:3000/profile')
            .then(data => setprofile(data.data))
            .catch(err=>console.log(err))

            axios.get("http://localhost:3000/followers")
            .then(data=>setfollowers(data.data))
            .catch(err=>console.log(err)
            )
    }, [unfollow])

    function HandleOnChange(e){
        setprofile(prev =>({
            ...prev ,
            [e.target.name]:e.target.value
        }))
    }
    const HandleUpdate =async()=>{
        axios.put('http://localhost:3000/profile',profile)
        .then(console.log("update"))
        .catch(err => console.log(err))
    }

    const handleUnfollow = async (id) => {
    axios.delete(`http://localhost:3000/followers/${id}`)
        .then(() => {
            alert('Unfollowed');
            setunfollow(prev => !prev);
        })
        .catch(err => console.log(err));
}
    return (
        <div className='m-5'>
            {profile ? (
                <div>
                    <img src={profile.profilePic} alt="" className='profileimg rounded-circle' />
                    <h5>{profile.username}</h5>

                    <input type="text"

                        value={profile.username}
                        name="username" 
                        className='form-control my-4'
                        onChange={HandleOnChange}/>
                        
                        

                         <button className='btn btn-primary my-4' onClick={HandleUpdate}>
                            update
                         </button>
                </div>
            ) : (
                <div>Loading....</div>
            )}
           {followers.length >0 ?(
            followers.map(follower=>(
                <div key={follower.id} className='d-flex my-2'>
                   {follower.username} 

                   <button className='btn btn-danger ms-auto'
                   onClick={()=>handleUnfollow(follower.id)}>
                    unfollow</button>
                </div>
            ))
           ):(
            <div>loading.....</div>
           )}
        </div>
    )
}

export default Profile
