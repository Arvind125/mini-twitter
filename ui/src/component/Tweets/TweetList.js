import React from "react";
import styles from "../Home.module.css";
import Card from "../UI/Card";

const TweetList = () => {
  return (
    <Card className={styles.tweets}>
      <h3>Tweets you may like</h3>
    </Card>
  );
};

export default TweetList;
