import React, { Component, useEffect, useState } from "react";
import VariantSelector from "../OptionSelector";
import Modal from "react-modal";
import { Box, Image, Text } from "rebass";
import { useRouter } from "next/router";
import Link from "next/link";

function Product(props) {
  const router = useRouter();
  const query = router.query.pw;
  
  return (
    <Link 
      href={{
        pathname: `/products/${props.product.title}`,
        query: { id: props.product.id, pw: query },
      }}
    >
      <a>
        <div className="product-container" key={props.product.title + Math.random() + ""}>
          {props.product.images.length ? (
            <Image
              src={props.product.images[0].src}
              alt={`${props.product.title} product shot`}
              width={[125, 200]}
              height={[125, 200]}
            />
          ) : null}
          {/* todo: default image in case  */}
          <h3>{props.collection}</h3>
          <h3>{props.product.title}</h3>
          {/* <span className="Product__price">${variant.price}</span> */}
          {/* {variantSelectors} */}
          {/* <label className="Product__option">
          Quantity
          <input min="1" type="number" defaultValue={variantQuantity} onChange={this.handleQuantityChange}></input>
        </label> */}
        </div>
      </a>
    </Link>
  );
}

export default Product;
