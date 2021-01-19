import Link from "next/link";

const TopNav = (props) =>  {

    var navi = [
        { text: "Home", link: "/" },
        { text: "Shop", link: "/shop" , under_construction: true },
        { text: "Archive", link: "/archive" , under_construction: true },
        { text: "About", link: "/about" , home:true },
        { text: "Contact", link: "mailto:contact@cmmnd.com" , home:true },
        { text: "Stickers", link: "/stickerform" , home:true },
      ];

    if (props.splash) { 
        navi = navi.filter((el) => (el.home))
    }

    const nav = navi.map((page) => (
        page.under_construction ?
        <h2><strike>{page.text}</strike></h2>
        : <Link href={page.link}>
            <a>
            <h2>{page.text}</h2>
            </a>
        </Link>
    ))

    return <>{nav}</>
}

export default TopNav;