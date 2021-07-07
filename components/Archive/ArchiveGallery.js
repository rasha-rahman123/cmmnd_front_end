import {useState} from "react";
import {Image} from 'rebass';

import {useRouter} from "next/router";

const ArchiveGallery = ({images, startingIndex, closeGallery}) => { 

    const router = useRouter();
    // active image index
    const [activeIndex, setActiveIndex] = useState(startingIndex);

    const getNextImage = (val) => {
        setActiveIndex(val);
    }

    const currentImageSrc = images[activeIndex].fields.file.url;
    
    return <div className="gallery-view-container">
        <button onClick={closeGallery} className="gallery-button close">
            <Image  
                sx={{
                    width: ['100%']
                }} src='/icon/close.png'/>
        </button>
        <button className={`gallery-button chevron ${activeIndex == 0 && "hide"}`} onClick={() => getNextImage(activeIndex-1)}><Image src='/icon/chevron.png'/></button>
        <div className="gallery-view-image">
            <Image width={250, 590} src={currentImageSrc}/>
        </div>
        <button className={`gallery-button chevron right ${activeIndex == images.length - 1 && "hide"}`} onClick={() => getNextImage(activeIndex+1)}><Image src='/icon/chevron.png'/></button>

    </div>
}


export default ArchiveGallery;