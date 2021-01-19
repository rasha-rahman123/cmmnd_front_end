
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {Image} from "rebass";
import { parseCookies } from "nookies";
import { ShopContext } from "../context/ShopContext";
import TopNav from './TopNav'
import Cart from "./Cart";
import Footer from "./Footer";


const Layout = ({ children }) => {
    const {checkout, isCartOpen, closeCart, openCart} = useContext(ShopContext);

    const router = useRouter();
    const cookies = parseCookies();
    const query = router.query.pw || '';


        return <div className="main-container">
            <div className="main-nav">
                <div className="home-icon">
                    <Link href="/">
                        <Image src='/cmmnd_logo.png' width={150}/>
                    </Link>
                </div>
                <div className="sub-nav"><TopNav/></div>
            </div>
            {children}
            <Footer/>
        </div>;

};

export default Layout;