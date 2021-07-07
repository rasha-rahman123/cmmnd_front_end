import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";
import { useContentful } from 'react-contentful';
import {Image} from 'rebass';
// import Archive from '../../components/Archive/Archive';

const ArchivePage = () => { 
    const router = useRouter();
    const {pw} = router.query;

    const { data, error, fetched, loading } = useContentful({
        contentType: 'archive',
        query: {
            'order': '-fields.order'
        }
    });


    if (loading || !fetched) {
        return null;
    }

    if (error) {
        console.error(error);
        return null;
    }

    if (!data) {
        return <p>Error leading archives, please try again later</p>;
    } 

    // See the Contentful query response
    console.debug(data);
    
    const archives = data.items.map((item)=>  {
        const image = item.fields.mainImage || item.fields.images[0];
        const {title,timeFrame} = item.fields;
        const size = image.fields.file.details.image;
        const ratio = size.width/size.height;
        const horizontal = ratio > 1 ? 'horizontal' : '';
        return <Link href={{
            pathname: `/archive/${title}`,
            query: {id:item.sys.id, pw: pw },
          }}
            shallow={true}
          >
            <a>
                <div className="product-container">
                    <div className={`archive-image ${horizontal}`}>
                    {image ? (
                        <img
                        src={image.fields.file.url}
                        alt={`${title} archive image`}
                        // width={[140, 200]}
                        // height={height}
                        />
                    ) : null}
                    </div>
                    <div className="product-preview-title">
                    <h3>{timeFrame}</h3>
                    <h3>{title}</h3>
                    </div>
                </div>
            </a>
        </Link>
    })

    // const activeArchive = id && <Archive id={id} title={archiveTitle}/>

    return <div className="grid-container"> 
        {archives}
    </div>

}

export default ArchivePage;