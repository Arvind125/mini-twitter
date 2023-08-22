import React, { useEffect, useState } from 'react'
import styles from "../Home.module.css"
import Card from '../UI/Card';

const PeopleList = () => {
    const [peoples, setPeoples] = useState([]);

useEffect(()=>{
    const fetchAllUsers = async() => {
        try{
            let response = await fetch("http://localhost:5000/users/all");
            console.log(response);
            if(response.ok){
                response = await response.json();
                setPeoples(response);
            }else{
                throw new Error("something went wrong");
            }
        }catch(err){
            console.log(err.message);
        }    
    }
    fetchAllUsers();
}, []);

    console.log(peoples);
  return (
    <Card className={styles.peoples}>
        <p>list of peoples</p>
    </Card>
  )
}

export default PeopleList