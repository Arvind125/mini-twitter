import React from "react";
import Card from "../UI/Card";
import styles from "./Profile.module.css";
import FollowerUser from "./FollowerUser";

const FollowersList = (props) => {
  const followers = props.followers;
  return (
    <Card className={styles.followers}>
      <h4>Followers</h4>
      <ul>
        {followers.map((userId) => (
          <FollowerUser id={userId} key={userId} />
        ))}
      </ul>
    </Card>
  );
};

export default FollowersList;
