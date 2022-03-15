import type { NextPage } from 'next'
import Head from 'next/head'
import Image from "next/image";
import styles from '../styles/Home.module.css'
import {Banner} from "../components/banner";
const Home: NextPage = () => {
    const handleOnBannerBtnClick=()=> {
        console.log('hi banner button')
    }
  return (
    <div className={styles.container}>
      <Head>
        <title> Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
            Coffee Connoisseur
        </h1>
          <Banner buttonText="View stores nearby!" handleOnClick={handleOnBannerBtnClick}/>
          <div className={styles.heroImage}>
          <Image  src="/static/hero-image.png"
                  width={700}
                  height={400}
                  alt="hero image"/>
          </div>
      </main>
    </div>
  )
}

export default Home
