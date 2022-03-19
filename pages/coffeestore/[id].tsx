import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import coffeeStores from "../../data/coffee-stores.json";
import styles from '../../styles/coffeestore.module.css'
import {CoffeeStoreDashboard, CoffeeStoreInformation} from "../../models/coffee_store_dashboard";
import {fecthCoffeeStores} from "../../lib";
export  const getStaticProps:GetStaticProps  = async(context)=> {
    const data:CoffeeStoreDashboard=await fecthCoffeeStores();
    let coffeeStoreDetail :CoffeeStoreInformation|null=null;
    try {
         coffeeStoreDetail = data.results.find((obj) => {
            return obj.fsq_id.toString() === context.params.id
        });
    } catch (e) {
        console.log('eeeeeeeeeeeee')
    }
    return {
        props: {
            coffeeStoresObj: coffeeStoreDetail,
            message:'test-message'
        }, // will be passed to the page component as props
    }
}
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id.toString(),
            },
        };
    });
    return {
        paths,
        fallback: true,
    };
    //return { paths:0||1||2 }
}
const CoffeeStore: NextPage = (props) => {
    const router = useRouter();
    const {id} = router.query;
    console.log('props', props)
   //  console.log('router ', router);
    if (router.isFallback) {
        return <div>loading..............</div>
    }
    const handleUpvoteButton=()=>{
        console.log('vote')
    }
    // @ts-ignore
    const coffeeStoresObj:CoffeeStoreInformation=props.coffeeStoresObj;
    console.log('coffeeStoresObj',coffeeStoresObj )
    return (
        <>
            {coffeeStoresObj && (
                <div className={styles.layout}>
                    <Head>
                        <title>{coffeeStoresObj.name}</title>
                    </Head>
                    <div className={styles.container}>
                        <div className={styles.col1}>
                            <div className={styles.backToHomeLink}>
                                <Link href="/">Back to home</Link>
                            </div>
                            <div className={styles.nameWrapper}>
                                <h1 className={styles.name}>{coffeeStoresObj.name}</h1>
                            </div>
                            <Image src={coffeeStoresObj.imageUrl22||
                            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                                   width={600}
                                   height={360}
                                   className={styles.storeImg}
                                   alt={coffeeStoresObj.name}></Image>
                        </div>
                        <div className={cls("glass", styles.col2)}>
                            <div className={styles.iconWrapper}>
                                <Image
                                    src="/static/icons/places.svg"
                                    width="24"
                                    height="24"
                                    alt="places icon"
                                />
                                <p className={styles.text}>{coffeeStoresObj.location.address}</p>
                            </div>
                            <div className={styles.iconWrapper}>
                                <Image
                                    src="/static/icons/nearMe.svg"
                                    width="24"
                                    height="24"
                                    alt="near me icon"
                                />
                                <p className={styles.text}>{coffeeStoresObj.location.formatted_address}</p>
                            </div>
                            <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
                                Up vote!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}
export default CoffeeStore;
