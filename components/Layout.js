
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {Image} from "rebass";
import { parseCookies } from "nookies";
import { ShopContext } from "../context/ShopContext";
import Cart from "./Cart";

const Layout = ({ children }) => {
    const {checkout, isCartOpen, closeCart, openCart} = useContext(ShopContext);

    const router = useRouter();
    const cookies = parseCookies();
    const query = router.query.pw || '';

    const navi = [
        { text: "Home", link: "/" + query},
        { text: "Shop", link: "/shop" + query, under_construction: true },
        { text: "Archive", link: "/archive" + query, under_construction: true },
        { text: "About", link: "/about" + query },
        { text: "Contact", link: "mailto:contact@cmmnd.com" + query },
        { text: "Stickers", link: "/stickerform" + query },
      ];

        const nav = navi.map((page) => ( 
            page.under_construction ? 
            <h2><strike>{page.text}</strike></h2>
            : <Link href={page.link}>
                <a>
                <h2>{page.text}</h2>
                </a>
            </Link> 
        ))

    // check for passwords
        return <div className="main-container">
            <div className="main-nav">
                <div className="home-icon">
                    <Link href="/">
                        <Image src='/cmmnd_logo.png' width={150}/>
                    </Link>
                </div>
                <div className="sub-nav">{nav}</div> 
            </div>
            {children}
        </div>;

};

export default Layout;