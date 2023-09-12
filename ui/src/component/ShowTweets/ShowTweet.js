import React, { useEffect, useState } from "react";
import styles from "./ShowTweet.module.css";

function formatTimestamp(timestamp) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(timestamp).toLocaleDateString("en-US", options);
}

const ShowTweet = (props) => {
  const [author, setAuthor] = useState({});

  const content = props.tweet.content;
  const authorId = props.tweet.author;
  const timeStamp = props.tweet.createdAt;

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/user/any/${authorId}`,
          {
            headers: {
              authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        if (response.status === 200) {
          response = await response.json();
          setAuthor(response);
        } else {
          console.log("failed to fetch Author information");
        }
      } catch (error) {
        console.log("failed to fetch Author information");
      }
    };

    fetchAuthor();
  }, [authorId]);

  return (
    <li className={styles["tweet-box"]}>
      <div className={styles["tweet-header"]}>
        <div className={styles.author}>
          <p>{author.name}</p>
        </div>
        <div className={styles.timestamp}>
          <p>{formatTimestamp(timeStamp)}</p>
        </div>
      </div>
      <div className={styles.content}>
        <p>{content}</p>
      </div>
    </li>
  );
};

export default ShowTweet;
