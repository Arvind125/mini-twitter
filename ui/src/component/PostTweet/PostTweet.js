import React, { useState } from "react";
import Card from "../UI/Card";
import styles from "./PostTweet.module.css";

const PostTweet = () => {
  const [enteredTweetText, setEnteredTweetText] = useState("");
  const [hasError, setHasError] = useState(null);

  const tweetPostHandler = async () => {
    if (!enteredTweetText) {
      setHasError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/tweets/create", {
        method: "POST",
        body: JSON.stringify({ tweetContent: enteredTweetText }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (response.status === 201) {
        console.log("Tweet posted successfully");
        setEnteredTweetText("");
      } else {
        console.log("Failed to post the tweet");
      }
    } catch (err) {
      console.log("failed to post the tweet");
    }
  };

  return (
    <Card className={styles["post-tweet-container"]}>
      <h3>Posts a new Tweet</h3>

      <textarea
        id="tweet"
        className={styles.textarea}
        rows="5"
        cols="60"
        placeholder="Enter your thought here"
        onChange={(e) => {
          setEnteredTweetText(e.target.value);
        }}
        value={enteredTweetText}
      />
      {hasError && !enteredTweetText && <p>Please enter a Idea to Post</p>}
      <button className={styles.btn} type="button" onClick={tweetPostHandler}>
        Post
      </button>
    </Card>
  );
};

export default PostTweet;
