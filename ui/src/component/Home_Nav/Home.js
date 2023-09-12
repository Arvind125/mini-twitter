import React from "react";
import Card from "../UI/Card";
import styles from "./Home.module.css";
import PeopleList from "../People/PeopleList";
import ShowTweetList from "../ShowTweets/ShowTweetList";

const Home = () => {
  return (
    <div>
      <p>Welcome to Mini Tweeter</p>
      <Card className={styles.container}>
        <PeopleList />
        <ShowTweetList />
      </Card>
    </div>
  );
};

export default Home;
