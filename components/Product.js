import React, { Component, useEffect, useState } from "react";
import VariantSelector from "./VariantSelector";
import Modal from "react-modal";
import { Box, Image, Text } from "rebass";
import { useRouter } from "next/router";
import Link from "next/link";

export function Product(props) {
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
        <div className="Product" style={{zIndex: 30}} key={props.product.title + Math.random() + ""}>
          {props.product.images.length ? (
            <Image
              sx={{
                boxShadow: "0px 0px 3px #00000050, 0px 0px 10px #00000015",
              }}
              src={props.product.images[0].src}
              alt={`${props.product.title} product shot`}
              width={[150, 300]}
              height={[150, 300]}
            />
          ) : null}
          {/* <h5 className="Product__title">{props.product.title}</h5> */}
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
