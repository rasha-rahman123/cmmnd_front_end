import Head from "next/head";
import { Box, Button, Image, Text } from "rebass";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ShopContext, client } from "../../context/ShopContext";
import Gallery from "../../components/Products/ImageGallery";
import Selector from '../../components/OptionSelector';

const Product = (props) => {
  const router = useRouter();
  const productID = router.query.id;

  const [loading, setLoading] = useState(true);

  // variant options
  const [options, setOptions] = useState(null);
  const [variant, setVariant] = useState(null);
  
  const [images, setImages] = useState([])
  
  const {fetchProductWithId, product, addItemToCheckout} = useContext(ShopContext)
 
  useEffect(async () => {
    setLoading(true);
    productID && await fetchProductWithId(productID)   
    setImages(product.images);
    let defaultOpts = {};
    product.options.forEach(el => {
      defaultOpts[el.name] = el.values[0].value;
    });
    setOptions(defaultOpts);
    setLoading(false);
  }, [productID]);

  const handleOptionChange = (e) => { 
    const target = e.target;
    let selectedOptions = options;
    selectedOptions[target.name] = target.value;

    const selectedVariant = client.product.helpers.variantForOptions(product, selectedOptions);
    setVariant(selectedVariant);
    // add selected image
    // setVariantImage(selectedVariant.attrs.image)
  }

  if(loading) return <h2>product is loading</h2>
  // put something here for rendering the selectors 
  else return (
      <div className='product-page'>
        <Head>
          <title>{product && product.title} - CMMND</title>
        </Head>
        {product && product.images && <Gallery images={product.images}/>}

        <div className='product-details'>
          <h1>
            {product && product.title}
          </h1>

          {/* todo: make variants dynamic */}
          <h4 className='product-pricing'>
            ${product && product.variants && product.variants[0].price} 
          </h4>

            <Selector 
              handleOptionChange={handleOptionChange}
              key={options.id}
              option={options.color}
            >
              { product && product.variants && (product.variants).map((x,i) => (
                <option
                  key={i} value={x.id}>
                  {x.title}
                </option>
              ))}
            </Selector>
          <Button onClick={() => addItemToCheckout(variant, 1)} width={150} height={50}><Text fontSize={2}>ADD TO CART</Text></Button>
        </div>
      </div>
  );
};

export default Product;
