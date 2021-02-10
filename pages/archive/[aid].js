import {useRouter} from "next/router";
import {useState, useEffect} from "react";

import {Image} from 'rebass';
import { Query } from 'react-contentful';
import ArchiveGallery from '../../components/Archive/ArchiveGallery';

const Archive = () => { 
    const router = useRouter();
    const pw = router.query.pw || '';

    useEffect(() => {
        if (router.asPath !== router.route) {
            console.log(router.query)
          setID(router.query.id)
        }
      }, [router])

    //   gallery boolean
    const [galleryIsOpen, setGalleryIsOpen] = useState(false);
    const [startingIndex, setStartingIndex] = useState(null);
    const [ID, setID] = useState(router.query.id);

    const openGallery = (index) => { 
        setGalleryIsOpen(true);
        setStartingIndex(index);
    }

    return <Query
        // contentType="archive"
        id={ID}
    >
        {({data, error, fetched, loading}) => {
            if (loading || !fetched) {
                return <div className="single-archive-page"></div>;
            }

            if (error) {
                console.error(error);
                return <div className="single-archive-page"><p>There was an error loading archives.</p></div>;
            }

            if (!data) {
                return <div className="single-archive-page"><p>Page does not exist.</p></div>;
            }

            // See the Contentful query response
            console.debug(data.fields.images);
            if (galleryIsOpen) { 
                return <ArchiveGallery images={data.fields.images} startingIndex={startingIndex} closeGallery={() => setGalleryIsOpen(false)} />
            }

            const {title,timeFrame, description, collaborators} = data.fields;

            const images = data.fields.images.map((img, i) => ( 
                <div className="product-container" onClick={() => openGallery(i)}>
                    <Image src={img.fields.file.url} width={[140, 200]}/>
                </div>
            ))
            
            // Process and pass in the loaded `data` necessary for your page or child components.
            return (
                <div className="single-archive-page">
                    <div className="archive-page-text">
                        <div className="archive-description">
                            <h3>{title}</h3>
                            <h3>{timeFrame}</h3>
                            <br/>
                            <h3 className="archive-description-text">{description}</h3>
                        </div>
                        <div>
                        {collaborators.split(';').map((collaborator) => (<h3 className="archive-collaborators archive-description-text">{collaborator}</h3>))}
                        </div>
                    </div>
                    <div className="grid-container"> 
                    {images}
                    </div>
                </div>
            );
        }}
    </Query>

}

export default Archive;