import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";

const FollowingUser = (props) => {
  const [user, setUser] = useState({ name: "dummy", email: "dummy@gmail.com" });
  const userId = props.id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let me = await fetch(`http://localhost:5000/user/any/${userId}`, {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });

        if (me.status === 200) {
          console.log("User fetched successfully");
          me = await me.json();
          setUser(me);
        } else {
          console.log("Failed to User detailes");
        }
      } catch (err) {
        console.log(err);
        console.log("Failed to User detailes");
      }
    };
    fetchUser();
  }, [setUser, userId]);

  const unFollowBtnHandler = () => {
    props.unFollowUser(userId);
  };

  return (
    <li className={styles.followingUser}>
      <span>{user.name}</span>
      <span>{user.email}</span>
      <button onClick={unFollowBtnHandler}>UnFollow</button>
    </li>
  );
};

export default FollowingUser;
