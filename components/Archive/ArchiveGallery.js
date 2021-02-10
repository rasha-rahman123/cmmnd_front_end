import {useState} from "react";
import { useContentful } from 'react-contentful';
import {Image} from 'rebass';

import {useRouter} from "next/router";

const ArchiveGallery = ({images, startingIndex, closeGallery}) => { 

    const router = useRouter();
    const {password} = router.query
    // active image index
    const [activeIndex, setActiveIndex] = useState(startingIndex);

    // const { data, error, fetched, loading } = useContentful({
    //     id: id,
    // });


    // if (loading || !fetched) {
    //     return null;
    // }

    // if (error) {
    //     console.error(error);
    //     return null;
    // }

    // if (!data) {
    //     return <p>Error loading {title}, please try again later</p>;
    // } 

    const getNextImage = (val) => {
        setActiveIndex(val);
    }


    // const images = data.fields.images;
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