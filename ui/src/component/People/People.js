import React from "react";
import Card from "../UI/Card";
import styles from "./People.module.css";

const People = (props) => {
  const { userId, name } = props;

  const followBtnHandler = () => {
    props.userFollowHandler(userId);
  };
  return (
    <Card className={styles.people}>
      <p>{name}</p>
      <button onClick={followBtnHandler}>Follow</button>
    </Card>
  );
};

export default People;
