import React from 'react'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'
import ExploreTweets from '../../Components/ExploreTweets/ExploreTweets'
import { useSelector } from 'react-redux'
import Signin from '../Signin/Signin'

const Explore = () => {

  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {!currentUser ? (<Signin />) : (
          <div className='grid grid-cls-1 md:grid-cols-4'>
          <div className='px-6'>
            <LeftSidebar />
          </div>
          <div className='col-span-2 border-x-2 border-t-slate-800 px-6'>
            <ExploreTweets />
          </div>
          <div className='px-6'>
            <RightSidebar />
          </div>  
        </div>
      )}
    </>
    
  )
}

export default Explore