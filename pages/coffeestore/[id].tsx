import {NextPage} from "next";
import {useRouter} from "next/router";
import Link from "next/link";
const CoffeeStore: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;
    console.log('router ', router);
    return (<>
        Coffee-Store {id}
        <Link href="/">Back to home</Link>
    </>)
}
export default CoffeeStore;
