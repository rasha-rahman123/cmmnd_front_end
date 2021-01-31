import Link from "next/link";
import {useRouter} from "next/router";
import {Image} from "rebass";


const Footer = () => { 
    const router = useRouter()
    const pw = router.query.pw || '';

    var navi = [
        { text: "About", link: "/about" , home:true },
        { text: "Contact", link: "mailto:contact@cmmnd.com" , home:true },
        { text: "Stickers", link: "/stickerform" , home:true },
        { text: "Terms", link: "/terms" , home:true },
      ];

    const nav = navi.map((page, i) => (
        <Link key={i} href={page.link + `?pw=${pw}`}>
            <a>
            <h2>{page.text}</h2>
            </a>
        </Link>
    ))

    return ( 
        <div class="footer">
            <div className="sub-nav">
            {nav}
            </div>
            <div className="footer-social-media">
            <a className="footer-logo" href="https://www.instagram.com/cmmnd/">
             <Image src="ig_logo.webp" width={30} />
             </a>
            <a className="footer-logo" href="https://twitter.com/CMMND_">
            <Image src="twitter_logo.webp" width={30} />
             </a> 
            <a className="footer-logo" href="https://open.spotify.com/artist/3ApVnTmYfGswz2LGXATNo1?si=RY2N1nHKTcyOlAxcVT4l_Q">
            <Image src="spotify_logo.webp" width={30} />
             </a>
             <a className="footer-logo" href="https://www.tiktok.com/@cmmnd.com?lang=en">
            <Image src="tiktok_logo.png" paddingTop={1} marginLeft={2} width={18} />
             </a>
             </div>
        </div>
    )
}

export default Footer; 