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
  if (loading || !product || !product.title || !product.options || !product.description || !variant) return <div className='product-page'></div>
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

    // console.log(product.description)
    const descArray = product.description.split('~');
    const description = descArray[0].slice(1).split(' -').map((line) => { 
      return <p>{`-${line}`}</p>
    });

    var sizeArray, sizes, sizesNum, sizeChart;
    if(descArray[1]) { 
      sizeArray = descArray[1].split(' -');
      sizes = sizeArray[1];
      sizesNum = sizeArray.slice(2);

      // console.log(sizeArray)

      sizeChart = <table cellspacing="0"  cellPadding="0" class="ks-table"> 
        <tbody>
          <tr className="table-row">
            {/* labels */}
            <td class="table-cell">{ ''}</td>
            {sizes.split(',').map((size) => (<td className='table-cell'>{size}</td>))}
          </tr>
          {sizesNum.map((row) => ( 
            <tr className="table-row">
            {
              row.split(',').map((num) => (<td className="table-cell">{num}</td>))
            }
            </tr>
          ))}
        </tbody>

      </table>
      
      
      
    //   <table class="ks-table">
    //   <tbody><tr class="ks-table-row">
    //   <td class="ks-table-cell ks-table-header-cell"> </td>
    
    //   <td class="ks-table-cell ks-table-header-cell">S </td>
    
    //   <td class="ks-table-cell ks-table-header-cell">M </td>
    
    //   <td class="ks-table-cell ks-table-header-cell">L </td>
    
    //   <td class="ks-table-cell ks-table-header-cell">XL </td>
    
    //   <td class="ks-table-cell ks-table-header-cell">XXL </td>
    // </tr></tbody>
    // </table>
    }


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
          {description}
          </div>
          <div className="product-sizechart">
            {sizeChart}
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
