import {FC} from "react";
import Image from "next/image";
import Link from "next/link";
import cls from "classnames";
import styles from '../../styles/card.module.css'

export const Card:FC<{name:string,imageUrl:string,hrefUrl:string}>=({name,imageUrl,hrefUrl})=> {
    return (<>
        <Link href={hrefUrl}>
            <a className={styles.cardLink}>
                <div className={cls("glass", styles.container)}>
                    <div className={styles.cardHeaderWrapper}>
                        <h2 className={styles.cardHeader}>{name}</h2>
                    </div>
                    <div className={styles.cardImageWrapper}>
                        <Image
                            alt={name}
                            className={styles.cardImage}
                            src={imageUrl}
                            width={260}
                            height={160}
                        />
                    </div>
                </div>
            </a>
        </Link>
    </>)
};
