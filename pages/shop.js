import React, { Component, useState, useRef, useEffect, useContext } from "react";
// import * as THREE from "three";
import Products from "../components/Products";
import Cart from "../components/Cart";
import Layout from "../components/Layout";
import { ShopContext } from "../context/ShopContext";
// import { useFrame, Canvas } from "react-three-fiber";


export function Shop(){
  const {fetchAllProducts, products} = useContext(ShopContext)
  useEffect(() => {
    fetchAllProducts();
    return () => {
        // cleanup
    };
}, [fetchAllProducts])
if (!products) return <Layout>Products are loading</Layout>
    return (
    
        <div className="App">
        
        <div>
     
          <Products
            products={products}
          />
          
        </div>
      
    </div>
    
    );
}

export default Shop;
