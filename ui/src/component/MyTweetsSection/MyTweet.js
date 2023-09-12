import React, { useState } from "react";
import Card from "../UI/Card";
import styles from "./MyTweets.module.css";

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

const MyTweet = (props) => {
  const [editing, setEditing] = useState(false);
  const { _id, content, createdAt } = props.tweet;
  const [editedTweet, setEditedTweet] = useState(content);

  const onSaveHandler = async () => {
    if (content === editedTweet) {
      console.log("Previous and current tweet is same");
      setEditing(false);
      return;
    }

    await props.updateTweetHandler(_id, editedTweet);
    setEditing(false);
  };

  const editTweetHandler = async () => {
    setEditing(true);
    // console.log("Tweet editing", _id);
  };

  return (
    <Card className={styles["tweet-card"]}>
      {!editing && <p className={styles["tweet-content"]}>{content}</p>}

      {editing && (
        <textarea
          className={styles.textarea}
          id="tweet"
          rows="5"
          cols="60"
          placeholder="Enter here to update tweet"
          onChange={(e) => {
            setEditedTweet(e.target.value);
          }}
          value={editedTweet}
        />
      )}

      <div className={styles.actions}>
        {!editing ? (
          <button className={styles.btn} onClick={editTweetHandler}>
            Edit
          </button>
        ) : (
          <button className={styles.btn} onClick={onSaveHandler}>
            Save
          </button>
        )}
        <button
          className={styles.btn}
          onClick={() => props.deleteTweetHandler(_id)}
        >
          Delete
        </button>
      </div>

      <p className={styles["time-stamp"]}>{formatTimestamp(createdAt)}</p>
    </Card>
  );
};

export default MyTweet;
