import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Tweet from '../Tweet/Tweet';


const TimelineTweet = () => {
    const [timeline, setTimeline] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const timeLineTweets = await axios.get(`/timeline/${currentUser._id}`);
                setTimeline(timeLineTweets.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [currentUser._id]);


    // console.log("timeline", timeline);


    return (
        <div className='text-white'>
            {timeline && timeline.map((tweet)=>{
                return (
                    <div key= {tweet._id} className='p-2'>
                        <Tweet tweet= {tweet}  setData = {setTimeline}/>

                    </div>
                )
            })}
        </div>
    )
}

export default TimelineTweet