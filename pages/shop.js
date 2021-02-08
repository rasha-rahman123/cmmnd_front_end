import { useRouter } from "next/router";
import React, { Component, useState, useCallback, useEffect, useContext } from "react";
// import * as THREE from "three";
import Product from "../components/Products/Product";
import { ShopContext } from "../context/ShopContext";

// import { useFrame, Canvas } from "react-three-fiber";


function Shop(){
  const {collections, isShopOpen} = useContext(ShopContext);
  const router = useRouter();
  const pw = router.query.pw || '';
  

  // unravel all products in collections
  const sortedCollections = collections.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.updatedAt) - new Date(a.updatedAt);
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
    </div>
  );

  return content
}

export default Shop;
