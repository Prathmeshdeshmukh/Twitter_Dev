import React , {useEffect, useState} from 'react'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Tweet from '../../Components/Tweet/Tweet'
import EditProfile from '../../Components/EditProfile/EditProfile'
import { following } from '../redux/userSlice';
import { useDispatch } from 'react-redux'

const Profile = () => {
  const [userProfile, setUserProfile]= useState(null);
  const [userTweets, setUserTweets] = useState(null);
  const [open, setOpen] = useState(false)
  const { currentUser } = useSelector((state)=> state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const profile = await axios.get(`/user/find/${id}`);
        console.log("profile", profile);
        const userTweets = await axios.get(`/tweets/all/${id}`);
        console.log("userTweets", userTweets.data);
        setUserProfile(profile.data);
        setUserTweets(userTweets.data);

      } catch (error) {
        console.log(error)
        
      }
    }
    fetchData();
  }, [currentUser, id])

  const handleFollow =async()=> {
    if(!currentUser.following.includes(id)){
      try {
        await axios.put(`/users/follow/${id}`, {
          id: currentUser._id
        });
        dispatch(following(id));
        console.log('followed')
      } catch (error) {
        console.log(error)
      }
    }else{
      try {
        await axios.put(`/users/unFollow/${id}`, {
          id: currentUser._id
        });
        console.log('unfollowed');
        dispatch(following(id));
      } catch (error) {
        console.log(error)
      }
    }
    
  }
  return (
    <>
    <div className='grid grid-cls-1 md:grid-cols-4'>
      <div className='px-6'>
        <LeftSidebar />
      </div>
      <div className='col-span-2 border-x-2 border-t-slate-800 px-6'>
        <div className= 'flex justify-between items-center'>
          <img src={userProfile ?.profilePicture} alt="Profile pic"
            className='w-20 h-20 rounded-full'
          />

        {
          currentUser._id == id ? 
          (<button className='px-4 -y-2 bg-blue-500 rounded-full text-white' 
          onClick = {()=> setOpen(true)}>
            Edit Profile
          </button>) 
          : currentUser.following.includes(id)?
          (
            <button className='px-4 -y-2 bg-blue-500 rounded-full text-white' onClick= {handleFollow} >
            Following
          </button>
          ) :(
            <button className='px-4 -y-2 bg-blue-500 rounded-full text-white' onClick= {handleFollow}>
              Follow
          </button>
          )
        }
        </div>
        <div className="mt-6 text-white">
            {userTweets &&
              userTweets.map((tweet) => {
                return (
                  <div className="p-2" key={tweet._id}>
                    <Tweet tweet={tweet} setData={setUserTweets} />
                  </div>
                );
              })}
          </div>
      </div>
      <div className='px-6'>
        <RightSidebar />
      </div>
    </div>
    {open && <EditProfile setOpen={setOpen}/>}
    </>
  )
}

export default Profile