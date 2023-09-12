import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./Profile.module.css";
import FollowersList from "./FollowersList";
import FollowingList from "./FollowingList";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        let me = await fetch("http://localhost:5000/user/me", {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });

        if (me.status === 200) {
          console.log("Profile fetched successfully");
          me = await me.json();
          setUser(me);
        } else {
          console.log("Failed to fetch profile data");
        }
      } catch (err) {
        console.log(err);
        console.log("Failed to fetch profile data");
      }
    };
    fetchMe();
  }, [setUser]);

  const basicDetails = user ? (
    <div className={styles.right}>
      <span style={{ fontWeight: "bold", fontSize: "large" }}>{user.name}</span>
      <span>{user.email}</span>
      <span>{user.followers.length} Followers</span>
      <span>{user.following.length} Following</span>
    </div>
  ) : (
    <p>Failed to fetch profile details</p>
  );

  return (
    <>
      <p>Profile Page</p>
      <Card className={styles.userDetails}>
        <img
          className={styles.dp}
          alt="logo"
          src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />

        {basicDetails}
      </Card>
      {user && <FollowingList following={user.following} />}
      {user && <FollowersList followers={user.followers} />}
    </>
  );
};

export default Profile;
