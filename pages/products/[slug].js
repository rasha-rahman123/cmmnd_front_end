import Head from "next/head";
// import { Box, Button, Image, Text } from "rebass";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ShopContext } from "../../context/ShopContext";
import Gallery from "../../components/Products/ImageGallery";
import Selector from '../../components/OptionSelector';

const Product = () => {
  const router = useRouter();
  const productID = router.query.id;
  const collection = router.query.collection;
  const pw = router.query.pw || '';

  var defaultOptionValues = {};
  // variant options
  const [options, setOptions] = useState(defaultOptionValues);
  const [variant, setVariant] = useState(null);
  
  // const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true);
  
  const {fetchProductWithId, product, clearProduct, addItemToCheckout, getVariantFromOptions} = useContext(ShopContext)

  useEffect(() => { 
    clearProduct()
  }, [])

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
      // find variants that are in stock
      const variantsInStock = product.variants.filter((v) => v.available)
      if(variantsInStock.length > 0) { 
        setVariant(variantsInStock[0]);
      } else { 
        setVariant(product.variants[0]);
      }
    }
  },[product])

  const addItemToCart = async (id) => { 
    await addItemToCheckout(id, 1);
    router.push({
      pathname: '/cart',
      query: {
        pw: pw,
      }
    })
  }

  const handleOptionChange = (e) => { 
    const target = e.target;
    let selectedOptions = options;
    selectedOptions[target.name] = target.value;  
    const selectedVariant = getVariantFromOptions(selectedOptions);
    setVariant(selectedVariant);
  }


// put something here for rendering the selectors 
  if (loading || !product || !product.title || !product.options || !variant) return <div className='product-page'></div>
  else { 
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

    return (
      <div className='product-page'>
        <Head>
          <title>{product.title} - CMMND</title>
        </Head>
        {product.images && <Gallery images={product.images}/>}
  
        <div className='product-details'>
          <h1>
            {collection + ' ' + product.title}
          </h1>
  
          {/* todo: make variants dynamic */}
          <h4 className='product-pricing'>
            ${product && product.variants && product.variants[0].price} 
          </h4>
          <div className="product-description">
          <p>{collection + ' ' + product.title}</p>
          {description}
          </div>
          <div className='product-selectors'>
            {selectors}
          </div>
          <div className='product-buttons'>
          {variant.available ? <button className="button" onClick={() => addItemToCart(variant.id)}><b>ADD TO CART</b></button> :  
          <h2>Out of stock</h2>}
          </div>
        </div>
      </div>
    );
  }
};

export default Product;
