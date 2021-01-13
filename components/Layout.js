
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
        // { text: "Shop", link: "/shop?pw=" + query },
        { text: "about", link: "/about" + query },
        { text: "sticker form", link: "/stickerform" + query },
        { text: "contact", link: "/contact" + query },
        { text: "archive", link: "/archive" + query },
      ];

        const nav = navi.map((page) => ( 
            <Link href={page.link}>
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
                        <Image src='/llll.png' width={200} sx={{filter: 'invert()', transition: 'all 300ms ease',":hover": {transform: 'scale(1.05)'}}}/>
                    </Link>
                </div>
                <div className="sub-nav">{nav}</div> 
            </div>
            {children}
        </div>;

};

export default Layout;