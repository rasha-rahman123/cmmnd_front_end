import Link from "next/link";
import {Image} from "rebass";


const Footer = () => { 
    return ( 
        <div class="footer">
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
    )
}

export default Footer; 