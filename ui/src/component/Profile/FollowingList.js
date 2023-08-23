import React, { useState } from "react";
import Card from "../UI/Card";
import styles from "./Profile.module.css";
import FollowingUser from "./FollowingUser";

const FollowingList = (props) => {
  const [following, setFollowing] = useState(props.following);

  const unFollowUser = async (userId) => {
    try {
      let response = await fetch("http://localhost:5000/connection/unfollow", {
        method: "PUT",
        body: JSON.stringify({ followId: userId }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (response.status === 200) {
        console.log("User Unfollowed successfully");
        // update local following list
        setFollowing((prevState) => {
          return prevState.filter((listUserId) => listUserId !== userId);
        });
      } else {
        console.log("Failed to Unfollow user");
      }
    } catch (err) {
      console.log("Failed to Unfollow user");
    }
  };

  return (
    <Card className={styles.following}>
      <h4>Following</h4>
      {following.map((userId) => (
        <FollowingUser id={userId} key={userId} unFollowUser={unFollowUser} />
      ))}
    </Card>
  );
};

export default FollowingList;
