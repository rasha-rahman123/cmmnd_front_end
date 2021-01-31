
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import {Image} from "rebass";
import { parseCookies } from "nookies";
import { ShopContext } from "../context/ShopContext";
import TopNav from './TopNav'
import Footer from "./Footer";
import Head from "next/head";


const Layout = ({ children }) => {
    const {fetchAllCollections, isShopOpen} = useContext(ShopContext);

    const router = useRouter();

    // useEffect(() => {
    //     if(isShopOpen()) { 
    //         fetchAllCollections(); 
    //     } 
    // }, []);
    
        return <div className="main-container">
            <Head>
                <title>CMMND</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="home-icon">
                    <Link href="/">
                        <Image src='/cmmnd_logo.png' width={130}/>
                    </Link>
                </div>
            <div className="main-nav">
                <div className="sub-nav"><TopNav/></div>
            </div>
            {children}
            <Footer/>
        </div>;

};

export default Layout;
