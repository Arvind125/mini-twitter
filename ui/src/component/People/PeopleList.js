import React, { useEffect, useState } from "react";
import styles from "./People.module.css";
import Card from "../UI/Card";
import People from "./People";

const PeopleList = () => {
  const [peoples, setPeoples] = useState([]);

  useEffect(() => {
    const fetchUnknownUsers = async () => {
      try {
        let response = await fetch("http://localhost:5000/user/not-followed", {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        // console.log(response);
        if (response.ok) {
          response = await response.json();
          if (response) setPeoples(response);
        } else {
          throw new Error("something went wrong");
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUnknownUsers();
  }, []);

  const userFollowHandler = async (userId) => {
    // console.log(userId);
    try {
      let response = await fetch("http://localhost:5000/connection/follow", {
        method: "PUT",
        body: JSON.stringify({ followId: userId }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (response.status === 200) {
        console.log("User followed successfully");
        setPeoples((prevState) => {
          return prevState.filter((item) => item._id !== userId);
        });
      } else {
        console.log("Failed to follow user");
      }
    } catch (err) {
      console.log("Failed to follow user");
    }
  };

  return (
    <Card className={styles.peoplesContainer}>
      <h3>Peoples You may know</h3>
      {peoples.length === 0 && <p>can't find users</p>}
      {peoples.map((p) => (
        <People
          userId={p._id}
          key={p._id}
          name={p.name}
          userFollowHandler={userFollowHandler}
        />
      ))}
    </Card>
  );
};

export default PeopleList;
