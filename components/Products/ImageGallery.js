import React, { useState } from 'react';
import {Image} from 'rebass';


const Gallery = ({images}) => {


    const [activeIndex, setActiveIndex] = useState(0);
    // const { data  } = useContentful({
    //     contentType: 'archive',
    //     query: {
    //         'fields.magazine': true
    //     }
    // });


    // var magazineImage, magazineID = null; 

    // if(data) { 
    //     magazineImage = data.items[0].fields.images[0].fields.file.url;
    //     magazineID = data.items[0].sys.id;
    // }


    return ( 
        <div className='image-gallery-container'>
            <Image className='product-active-image' marginRight={20} marginBottom={20} height={[320,480]} src={images[activeIndex].src}/>
            <div className='secondary-images-container'>
                {images.map((img, i) => ( 
                    <div className="product-secondary-image" onClick={() => {setActiveIndex(i)}}><Image width={[80, 100]} src={img.src}/></div> 
                ))}
            </div>
        </div>
    )
}

export default Gallery;