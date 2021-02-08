import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";
import { useContentful } from 'react-contentful';
import {Image} from 'rebass';
import Archive from '../../components/Archive/Archive';

const ArchivePage = () => { 
    const router = useRouter();
    const {pw, id, archiveTitle} = router.query;

    // const [archives, setArchives] = useState([])
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
        // const ratio = size.width/size.height;
        // const width = ratio > 1 ? 280 : 180;
        return <Link href={{
            pathname: `/archives`,
            query: {title:title, id:item.sys.id, pw: pw },
          }}
            shallow={true}
          >
            <a>
                <div className="product-container">
                    {image ? (
                        <Image
                        src={image.fields.file.url}
                        alt={`${title} archive image`}
                        width={[140, 200]}
                        />
                    ) : null}
                    <div className="product-preview-title">
                    <h3>{timeFrame}</h3>
                    <h3>{title}</h3>
                    </div>
                </div>
            </a>
        </Link>
    })

    const activeArchive = id && <Archive id={id} title={archiveTitle}/>

    return <div className="grid-container"> 
        {activeArchive || archives}
    </div>

}

export default ArchivePage;