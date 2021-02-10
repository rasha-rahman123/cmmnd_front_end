
import { Query } from 'react-contentful';

const Contact = () => { 
    return <Query
        contentType="contact"
    >
        {({data, error, fetched, loading}) => {
            if (loading || !fetched) {
                return null;
            }

            if (error) {
                console.error(error);
                return null;
            }

            if (!data) {
                return <p>Terms not available</p>;
            }

            const {title, links} = data.items[0].fields;
            console.log(links)
            // Process and pass in the loaded `data` necessary for your page or child components.
            return (
                <div className="contact-container">
                <h1>{title}</h1>    
                <br/>
                {
                    Object.keys(links).map((link) => (<a href={`mailto:${links[link]}`}><p><u>{link}</u></p></a>))
                }
                </div>
            );
        }}
    </Query> 
}

export default Contact;