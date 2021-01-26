import React, { Component, useState, useCallback, useEffect, useContext } from "react";
// import * as THREE from "three";
import Products from "../components/Products/Products";
import { ShopContext } from "../context/ShopContext";

// import { useFrame, Canvas } from "react-three-fiber";


function Shop(){
  const {fetchAllCollections, collections} = useContext(ShopContext);

  // const [products, setProducts] = useState([]);
  // const [items] = useState(products);
  
  useEffect(() => {
    fetchAllCollections(); 
  }, []);

  const collectionsWithProducts = collections.map((collection) => ( 
    collection.products.length != 0 ? <Products
      collection={collection.title}
      products={collection.products}
    /> : null
  ));

  // if timeout than say error loading
  if (collections.length == 0) return <h2>Collections are loading</h2>

  return (
      <div className="App">
        <div>
          {collectionsWithProducts}
        </div>
    </div>
  );
}

export default Shop;
