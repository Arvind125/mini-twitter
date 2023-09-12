import React from "react";
import MyTweetsList from "./MyTweetsList";
import PostTweet from "../PostTweet/PostTweet";

const MyTweetsSection = () => {
  return (
    <>
      <PostTweet />
      <MyTweetsList />
    </>
  );
};

export default MyTweetsSection;
