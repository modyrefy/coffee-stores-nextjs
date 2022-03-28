import {GetStaticPaths, GetStaticProps,GetServerSideProps , NextPage} from "next";
import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import coffeeStores from "../../data/coffee-stores.json";
import styles from '../../styles/coffeestore.module.css'
import {CoffeeStoreDashboard, CoffeeStoreInformation} from "../../models/coffee_store_dashboard";
import {fecthCoffeeStores} from "../../lib";
import {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../store";
import {ICoffeeStore} from "../../models/coffeeStore";
import {isEmpty} from "../../utils";
export  const getStaticProps:GetStaticProps  = async(context)=> {
//export  const getServerSideProps:GetServerSideProps   = async(context)=> {
    const data:CoffeeStoreDashboard=await fecthCoffeeStores();
    let coffeeStoreDetail:CoffeeStoreInformation|null | undefined=null;
    try {
         coffeeStoreDetail = data.results.find((obj) => {
            // @ts-ignore
             return obj.fsq_id.toString() == context.params.id
        });
    } catch (error:any) {
        coffeeStoreDetail=null;
        alert(error.message)
        console.log(error.message)
    }
    coffeeStoreDetail=coffeeStoreDetail===undefined?null:coffeeStoreDetail;
    console.log('coffeeStoreDetail',coffeeStoreDetail);
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
    // @ts-ignore
    const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore || {});
    // @ts-ignore
    const {state: { coffeeStores },} = useContext(StoreContext);

    if (router.isFallback) {
        return <div>loading..............</div>
    }

    const handleCreateCoffeeStore = async (coffeeStore:ICoffeeStore) => {
        try {
            const { id, name, voting, imageUrl, neighbourhood, address } = coffeeStore;
            const response = await fetch("/api/createCoffeeStore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    name,
                    voting: 0,
                    imageUrl,
                    neighbourhood: neighbourhood || "",
                    address: address || "",
                }),
            });

            const dbCoffeeStore = await response.json();
        } catch (err) {
            console.error("Error creating coffee store", err);
        }
    };
    const handleUpvoteButton=()=>{
        console.log('vote')
    }
    useEffect(() => {
        if (isEmpty(props.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
                    return coffeeStore.id.toString() === id; //dynamic id
                });

                if (coffeeStoreFromContext) {
                    setCoffeeStore(coffeeStoreFromContext);
                    handleCreateCoffeeStore(coffeeStoreFromContext);
                }
            }
        } else {
            // SSG
            handleCreateCoffeeStore(props.coffeeStore);
        }
    }, [id, , props.coffeeStore, coffeeStores]);

    // @ts-ignore
   const coffeeStoresObj:CoffeeStoreInformation|null=props.coffeeStoresObj;
    //console.log('coffeeStoresObj',props.coffeeStoresObj )
    return (
        <>
            {coffeeStoresObj==null &&(<>No data to display please try again later</>)}
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
                            <Image src={coffeeStoresObj.imageUrl||
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
