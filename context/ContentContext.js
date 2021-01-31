import { createContext, useEffect, useState } from 'react';

export const ContentContext = createContext();

export const client = Client.buildClient({
    storefrontAccessToken: '7df2142caeb8ea3b206bfb4ba39d3fa9',//process.env.API_TOKEN,
    domain: 'cmmndllc.myshopify.com'//process.env.STORE_URL
});


function ContentProvider () { 
    // get archive folders



    return ( 
        <ContentContext.Provider value={{
          }}>
              {props.children}
          </ContentContext.Provider>
        
    )
}

export const ContentProvider = ContentProvider.Consumer

export default ContentProvider;