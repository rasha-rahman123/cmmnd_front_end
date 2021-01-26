import React, { useState } from 'react';
import {Image} from 'rebass';

const Gallery = ({images}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return ( 
        <div className='image-gallery-container'>
            <Image className='product-active-image' width={[200,480]} src={images[activeIndex].src}/>
            <div className='secondary-images-container'>
                {images.map((img, i) => (
                    i != activeIndex ? 
                    <Image width={[80, 150]} src={img.src}/> :
                    null
                ))}
            </div>
        </div>
    )
}

export default Gallery;