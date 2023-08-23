import React from "react";
import Card from "./UI/Card";
import styles from "./Home.module.css";
import PeopleList from "./People/PeopleList";
import TweetList from "./Tweets/TweetList";

const Home = () => {
  return (
    <div>
      <p>Welcome to Mini Tweeter</p>
      <Card className={styles.container}>
        <PeopleList />
        <TweetList />
      </Card>
    </div>
  );
};

export default Home;
