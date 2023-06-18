import React from "react";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import MainTweet from "../../Components/MainTweet/MainTweet";
import Signin from "../Signin/Signin";
import { useNavigate } from 'react-redux'

import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log("user", currentUser);
  return (
    <>
      {
        !currentUser ? (<Signin />) :
          (
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="px-6">
                <LeftSidebar />
              </div>
              <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
                <MainTweet />
              </div>
              <div className="px-6">
                <RightSidebar />
              </div>
            </div>
          )
      }
    </>
  );
};

export default Home;