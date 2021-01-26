import React, { Component } from 'react';
import Product from './Product';

const Products = ({products,collection}) => {
    let product_elements = products.map((product) => {
      console.log(product, "products")
      return (
        <Product
          // addVariantToCart={product.addVariantToCart}
          collection={collection}
          key={product.id}
          product={product}
        />
      );
    });

    return (
      <div className="Product-wrapper">
        {product_elements}
      </div>
    );


}

export default Products;
