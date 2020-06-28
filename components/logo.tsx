import React from "react";
import styles from './logo.module.css';
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" replace>
            <a style={{display: "block"}}>
                <img src="/logo.png" className={styles.logo}/>
            </a>
        </Link>
    );
}