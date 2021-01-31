import Link from "next/link";
import {useRouter} from "next/router";
import {useContext} from "react";
import {ShopContext} from "../context/ShopContext";
import {countTotalLineItems} from '../context/utils';

const TopNav = (props) =>  {

    const router = useRouter()
    const pw = router.query.pw || '';

    const {isCartOpen, checkout, isShopOpen} = useContext(ShopContext);

    var navi = [
        { text: "Home", link: "/" },
        { text: "Shop", link: "/shop", under_construction: !isShopOpen() },
        { text: "Music", link: "/music" , home:true},
        { text: "Archive", link: "/archive" , under_construction: true, home:true },
        // { text: "Stickers", link: "/stickerform" , home:true },
      ];


    if (props.splash) { 
        navi = [
            { text: "About", link: "/about" , home:true },
            { text: "Contact", link: "mailto:contact@cmmnd.com" , home:true },
            { text: "Stickers", link: "/stickerform" , home:true },
        ]
        
        navi = navi.filter((el) => (el.home))
    }

    const nav = navi.map((page, i) => (
        page.under_construction ?
        <h2 key={i}><strike>{page.text}</strike></h2>
        : <Link key={i} href={page.link + `?pw=${pw}`}>
            <a>
            <h2>{page.text}</h2>
            </a>
        </Link>
    ))

    var cart = null;
    // todo: close cart if it is open and empty ? 
    if(checkout && checkout.lineItems) {

        if (!isCartOpen || !isShopOpen()) { 
            cart = null;
        } 
        else { 
            const itemslen = countTotalLineItems(checkout.lineItems);
            cart = <Link href={`/cart?pw=${pw}`}>
            <a>
                <h2 class='shopping-cart-nav'>{`Cart(${itemslen})`}</h2>
            </a>
            </Link>
        }
    } 
  
    
    return <>{nav}{cart}</>
}

export default TopNav;