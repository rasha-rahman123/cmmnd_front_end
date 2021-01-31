import Link from "next/link";
import {useRouter} from "next/router";
import {useContext} from "react";
import {Image} from "rebass";
// import {ShopContext} from "../context/ShopContext";

const Music = () => { 

    var navi = [
        { text: "spotify", link: "https://open.spotify.com/artist/3ApVnTmYfGswz2LGXATNo1?si=xEUS8gbmSbuasA-kNDv29A" },
        { text: "itunes", link: "https://music.apple.com/us/artist/cmmnd/1463744506" },
        { text: "soundcloud", link: "https://soundcloud.com/cmmnd?ref=clipboard&p=i&c=0" },
        { text: "youtube", link: "https://youtube.com/channel/UCeOE4qhQ1riwCtkEPsMbpNg" },
      ];


    return <div className="single-column-container">
        <Image src='/music_profile.jpeg' marginTop={30} width={[350,600]}/>
        <div className="music-description">
        <p>CMMND music consists of okay coleman!, Seiji Oda, and sleepyboybryan</p>
        <br/>
        <p>Discography:</p>
        <p>CMMND EP (2019)</p>
        <p>Sum Light - Single (2020)</p>
        </div>
        <div className="sub-nav">
            {navi.map((el) => ( 
                <a className="music-link" href={el.link}>
                 <p> {el.text}</p> 
                </a>
            ))}
        </div>
    </div>;
}

export default Music;