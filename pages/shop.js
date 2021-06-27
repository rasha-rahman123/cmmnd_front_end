import { useRouter } from "next/router";
import React, { Component, useState, useCallback, useEffect, useContext } from "react";
// import * as THREE from "three";
import Product from "../components/Products/Product";
import { ShopContext } from "../context/ShopContext";
import { useContentful } from 'react-contentful';
import Link from 'next/link';

import {Image} from 'rebass'

// import { useFrame, Canvas } from "react-three-fiber";


function Shop(){
  const {collections, isShopOpen} = useContext(ShopContext);
  const router = useRouter();
  const pw = router.query.pw || '';

  const { data  } = useContentful({
    contentType: 'archive',
    query: {
        'fields.magazine': true
    }
  });


  var magazineImage, magazineID, magazine = null; 

  if(data) { 
      // map
      data.items.map((mag) => { 
        magazineImage = mag.fields.images[0].fields.file.url;
        magazineID = mag.sys.id;
        magazine = 
          <Link href={{
              pathname: `/archive/${mag.fields.title}`,
              query: {id:magazineID, pw: pw },
          }}>
            <a>
              <div className="product-container">
                <div className="product-image-container magazine">
                  <Image src={magazineImage} width={[280, 220]} />
                </div>
                <div className="product-preview-title">
                  <h3>{mag.fields.title}</h3>
                  <h3>{mag.fields.timeFrame}</h3>
                  </div>
              </div>
            </a>
          </Link>
      })
    
  }

  // sort collections by recent
  const sortedCollections = collections.sort(function(a,b){
    if(parseInt(a.description) < parseInt(b.description)) { return -1; }
    if(parseInt(a.description) > parseInt(b.description)) { return 1; }
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    // return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const collectionsWithProducts = sortedCollections.map((collection) => { 
    if (collection.products.length != 0) { 
      return collection.products.map((product) => { 
        
        return (
          <Product
            collection={collection.title}
            key={product.id}
            product={product}
          />
        );
      })
    }
  });

  // if timeout then say error loading
  var content = null 
  if (!isShopOpen(pw)) content = <h2>Shop is not open yet</h2>
  else if (collections.length == 0) content = <h2>Collections are loading</h2>
  else content = (
    <div className="grid-container">
      {collectionsWithProducts}
      {magazine}
    </div>
  );

  return content
}

export default Shop;
