
import { Query } from 'react-contentful';
import ReactMarkdown from "react-markdown/with-html";

const Terms = () => { 

    return <Query
        contentType="terms"
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

            const {title, returnsAndExchanges, shipping, privacy} = data.items[0].fields;

            // Process and pass in the loaded `data` necessary for your page or child components.
            return (
                <div className="stickerform-container">
                <h1>{title}</h1>
                <br/><br/>
                {returnsAndExchanges ? <> <h2>Returns and Exchanges</h2> <p><ReactMarkdown escapeHtml={false} source={returnsAndExchanges} /></p> </> : null}
                <br/>
                {shipping ? <><h2>Shipping</h2> <p><ReactMarkdown escapeHtml={false} source={shipping} /></p></> : null}
                <br/>
                {privacy ? <> <h2>Privacy</h2> <p><ReactMarkdown escapeHtml={false} source={privacy} /></p></> : null}
                </div>
            );
        }}
    </Query> 
}

export default Terms;