import React, { Component, useEffect, useState } from "react";
import VariantSelector from "../OptionSelector";
import Modal from "react-modal";
import { Box, Image, Text } from "rebass";
import { useRouter } from "next/router";
import Link from "next/link";

function Product(props) {
  const router = useRouter();
  const query = router.query.pw;

  const available = props.product.availableForSale;

  return (
    <Link 
      href={{
        pathname: `/products/${props.product.title}`,
        query: { collection:props.collection , id: props.product.id, pw: query },
      }}
    >
      <a>
        <div className={`product-container`} key={props.product.title + Math.random() + ""}>
          <div className="product-image-container">
          {!available && <div className="not-available">
            <h3>sold out</h3>  
          </div>}
          {props.product.images.length ? (
            <Image
              src={props.product.images[0].src}
              alt={`${props.product.title} product shot`}
              width={[280, 220]}
            />
          ) : null}
          </div>
          <div className="product-preview-title">
          <h3>{props.collection}</h3>
          <h3>{props.product.title}</h3>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default Product;
