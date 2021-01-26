import Head from "next/head";
import { Box, Button, Image, Text } from "rebass";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ShopContext } from "../../context/ShopContext";
import Gallery from "../../components/Products/ImageGallery";
import Selector from '../../components/OptionSelector';

const Product = () => {
  const router = useRouter();
  const productID = router.query.id;
  // set default opts
  var defaultOptionValues = {};
  // variant options
  const [options, setOptions] = useState(defaultOptionValues);
  const [variant, setVariant] = useState(null);
  
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true);
  
  const {fetchProductWithId, product, addItemToCheckout, getVariantFromOptions} = useContext(ShopContext)

  useEffect(() => { 
    setLoading(true);
    fetchProductWithId(productID);
    setLoading(false);
  }, [productID])


  useEffect(() => { 
    if (product && product.options && product.variants) { 
      product.options.forEach((selector) => {
        defaultOptionValues[selector.name] = selector.values[0].value;
      });
  
      setOptions(defaultOptionValues);
      setVariant(product.variants[0])
    }
  },[product])

  const handleOptionChange = (e) => { 
    const target = e.target;
    // bug: does this change the option in state? 
    let selectedOptions = options;
    selectedOptions[target.name] = target.value;  
    const selectedVariant = getVariantFromOptions(selectedOptions);
    setVariant(selectedVariant);
    // add selected image
    // setVariantImage(selectedVariant.attrs.image)
  }


// put something here for rendering the selectors 
  if (loading) return <h4>Product is loading</h4>
  else { 
    console.log(product.options)
    const selectors = product.options && product.options.map((option) => {
      return (
        <Selector
          handleOptionChange={handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
      );
    }); 

    const description = product.description && product.description.slice(1).split(' -').map((line) => { 
      return <p>{`-${line}`}</p>
    });
    console.log(description, product.description)

    return (
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
          <div className="product-description">
          <p>{product.title}</p>
          {description}
          </div>
          <div className='product-selectors'>
            {selectors}
          </div>
          <Button onClick={() => addItemToCheckout(variant.id, 1)} width={150} height={50}><Text fontSize={2}>ADD TO CART</Text></Button>
        </div>
      </div>
    );
  }
};

export default Product;
