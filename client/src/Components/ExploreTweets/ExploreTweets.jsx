import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Tweet from '../Tweet/Tweet';
import axios from 'axios';

const ExploreTweets = () => {
  const { currentUser } = useSelector((state)=> state.user);
  const [explore, setExplore] = useState(null);

  useEffect(()=> {
    const getchData = async()=>{
      try {
        const exploreTweets = await axios.get('/explore');
        setExplore(exploreTweets.data);
      } catch (error) {
        console.log(error)
        
      }
    }
    getchData();
  }, [currentUser._id])
  return (
    <div className='text-white'>
      {explore && explore.map((tweet)=>{
        return (
          <div key= {tweet._id} className='p-2'>
            <Tweet tweet={tweet} setData={setExplore}/>
          </div>
        )
      })}
    </div>
  )
}

export default ExploreTweets