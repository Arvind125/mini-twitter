import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MyTweet from "./MyTweet";
import styles from "./MyTweets.module.css";

const MyTweetsList = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchMyTweets = async () => {
      try {
        let response = await fetch("http://localhost:5000/tweets/me", {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });

        if (response.status === 200) {
          response = await response.json();
          setTweets(response);
          console.log("My tweets fetched succesfully");
        } else {
          console.log("failed to fetch my tweets");
        }
      } catch (err) {
        console.log("Failed to fetch my Tweets", err);
      }
    };
    fetchMyTweets();
  }, []);

  const deleteTweetHandler = async (tweetId) => {
    // console.log("deleting the tweet", tweetId);
    try {
      let response = await fetch(
        `http://localhost:5000/tweets/delete/${tweetId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Tweet deleted successfully");
        setTweets((prevState) => {
          return prevState.filter((item) => item._id !== tweetId);
        });
      } else {
        console.log("Failed to delete the tweet");
      }
    } catch (err) {
      console.log("Failed to Delete the Tweet");
    }
  };

  const updateTweetHandler = async (tweetId, editedTweet) => {
    try {
      let response = await fetch(
        `http://localhost:5000/tweets/update/${tweetId}`,
        {
          method: "PUT",
          body: JSON.stringify({ newContent: editedTweet }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Tweet updated succesfully!!!");

        setTweets((prevTweetList) =>
          prevTweetList.map((tweet) =>
            tweet._id === tweetId ? { ...tweet, content: editedTweet } : tweet
          )
        );
      } else {
        console.log("Failed to update the Tweet");
      }
    } catch (err) {
      console.log(err);
      console.log("Failed to update the Tweet");
    }
  };

  return (
    <Card>
      <h3>MyTweets</h3>
      <div className={styles["tweet-grid"]}>
        {tweets.map((tweet) => (
          <MyTweet
            key={tweet._id}
            tweet={tweet}
            deleteTweetHandler={deleteTweetHandler}
            updateTweetHandler={updateTweetHandler}
          />
        ))}
      </div>
    </Card>
  );
};

export default MyTweetsList;
