import React from 'react'
import Card from './UI/Card'
import styles from "./Home.module.css"
import PeopleList from './People/PeopleList'

const Home = () => {
  return (
    <div>
        <p>Welcome to Mini Tweeter</p>
        <Card className={styles.container}>
          <PeopleList/>

          <Card className={styles.tweets}>
            <p>list  of tweets</p>
          </Card>
        </Card>
    </div>
  )
}

export default Home