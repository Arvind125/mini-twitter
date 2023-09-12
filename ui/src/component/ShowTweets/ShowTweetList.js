import React, { useEffect, useState } from "react";
import styles from "./ShowTweet.module.css";
import Card from "../UI/Card";
import ShowTweet from "./ShowTweet";

const ShowTweetList = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchFollowingTweets = async () => {
      try {
        let response = await fetch("http://localhost:5000/tweets/followings", {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });

        if (response.status === 200) {
          response = await response.json();
          setTweets(response);
        } else {
          console.log(
            "failed to fetch tweets of following user",
            response.message
          );
        }
      } catch (error) {
        console.log("failed to fetch tweets of following user");
      }
    };

    fetchFollowingTweets();
  }, [setTweets]);

  // console.log(tweets);
  return (
    <Card className={styles.tweetsSection}>
      <h3>Tweets you may like</h3>
      <ul className={"tweetsContainer"}>
        {tweets.map((item) => (
          <ShowTweet key={item._id} tweet={item} />
        ))}
      </ul>
    </Card>
  );
};

export default ShowTweetList;
