import {Image} from "rebass";

function about () {
    return (
        <div className="about-container">
            <Image src='/cmmnd_profile.webp' width={300}/>
            <div className="about-description">
                <h1>About Us</h1>
                <p>CMMND is a Los Angeles-based art collective founded in 2018. Unlike traditional fashion brands or music groups, we strive to blur the lines between different artistic mediums.Through this approach, we utilize our individual skill sets to create collaborative projects ranging from seasonal apparel collections to a full length EP. Our mission is to promote the message that regardless of identity and career, everyone is a creative.</p>
            </div>
        </div>
    );

}

export default about;