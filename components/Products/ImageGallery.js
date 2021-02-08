import React, { useState } from 'react';
import {Image} from 'rebass';
import {useRouter} from "next/router";
import { useContentful } from 'react-contentful';
import Link from 'next/link';


const Gallery = ({images}) => {
    const router = useRouter();
    const pw = router.query.pw;

    const [activeIndex, setActiveIndex] = useState(0);
    const { data  } = useContentful({
        contentType: 'archive',
        query: {
            'fields.magazine': true
        }
    });


    var magazineImage, magazineID = null; 

    if(data) { 
        magazineImage = data.items[0].fields.images[0].fields.file.url;
        magazineID = data.items[0].sys.id;
    }


    return ( 
        <div className='image-gallery-container'>
            <Image className='product-active-image' marginRight={20} marginBottom={20} height={[320,480]} src={images[activeIndex].src}/>
            <div className='secondary-images-container'>
                {images.map((img, i) => ( 
                    <div className="product-secondary-image" onClick={() => {setActiveIndex(i)}}><Image width={[80, 100]} src={img.src}/></div> 
                ))}
                {magazineImage &&  <Link href={{
                    pathname: `/archives`,
                    query: {id:magazineID, pw: pw },
                }}>
                    <a>
                        <Image width={[80, 100]} src={magazineImage} />
                    </a>
                </Link>}
            </div>
        </div>
    )
}

export default Gallery;