import { createContext, useEffect, useState } from 'react';
import {useRouter} from 'next/router'
import './utils'
import Client from 'shopify-buy'
import { countTotalLineItems } from './utils';
import { create } from 'react-test-renderer';

// makes requests
// changes values in context
export const ShopContext = createContext();

export const client = Client.buildClient({
    storefrontAccessToken: '7df2142caeb8ea3b206bfb4ba39d3fa9',//process.env.API_TOKEN,
    domain: 'cmmndllc.myshopify.com'//process.env.STORE_URL
});

function ShopProvider(props) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    // const [shopOpen, setShopOpen] = useState(false);
    const [checkout, setCheckout] = useState({});
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [collections, setCollections] = useState([]);
    const router = useRouter();

    useEffect(async() => {
        fetchAllCollections(); 

          if (localStorage.checkout) {
            await fetchCheckout(localStorage.checkout);
          } else { 
            await createCheckout();
          }
    },[])

    useEffect(() => { 
      // if there are lineitems
      if(checkout && checkout.lineItems) { 
        const num = countTotalLineItems(checkout.lineItems)
        if ( num == 0 ) { 
          setIsCartOpen(false);
        } else { 
          setIsCartOpen(true); 
        }
      } else { 
        setIsCartOpen(false)
      }

      // if checkout was completed create a new one
      if(checkout && checkout.completedAt) { 
        createCheckout();
        setIsCartOpen(false)
      }
    }, [checkout])

    // check if the password query is set, if yes allow shop 
    const isShopOpen = (ps) => {
      const pw = ps || router.query.pw || '';

      // if (pw === 'creativelabog') { 
      //   return true;
      // }
      // todo: clear query
      return true;
      
    }

    const getVariantFromOptions = (options) => { 
      return client.product.helpers.variantForOptions(product, options)
    }

    const createCheckout = async () => {
        const newCheckout = await client.checkout.create();
        localStorage.setItem("checkout", newCheckout.id);
        setCheckout(newCheckout);
      };
    
    const fetchCheckout = async (checkoutId) => {
        client.checkout
          .fetch(checkoutId)
          .then((result) => {
           setCheckout(result)
           return true;
          })
          .catch((err) => {
            createCheckout();
            console.log(err)
            alert("Error finding your cart, please try again later", err)
          });
        
      };
      
    const addItemToCheckout = async (variantId, quantity) => {
        const lineItemsToAdd = [
          {
            variantId,
            quantity: parseInt(quantity, 10),
          },
        ];
        const check = await client.checkout.addLineItems(
          checkout.id,
          lineItemsToAdd
        );
        setCheckout(check)
        setIsCartOpen(true);
      };
  
      const fetchAllCollections = async () => { 
        const collections = await client.collection.fetchAllWithProducts();
        setCollections(collections)
      }
      
      const fetchAllProducts = async () => {
        const products = await client.product.fetchAll();
        setProducts(products);
      };
    
      const fetchProductWithId = async (id) => {
        const product = await client.product.fetch(id);
        setProduct(product)
        return product;
      };

      const clearProduct = () => { 
        setProduct({})
      }

      const updateQuantityInCart = async (lineItemId, quantity) => {
        const checkoutId = checkout.id;
        const lineItemsToUpdate = [
          { id: lineItemId, quantity: parseInt(quantity, 10) },
        ];
        const check = await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate)
        // console.log(check);
        setCheckout(check)

      }
    
      const removeLineItemInCart = async (lineItemId) => {
        const checkoutId = checkout.id;

        const check = await client.checkout.removeLineItems(checkoutId, [lineItemId])
        setCheckout(check);
      }
    


    return (
        <ShopContext.Provider value={{
          isCartOpen,
          checkout,
          products,
          product, 
          collections,
          isShopOpen,
          getVariantFromOptions,
          clearProduct,
          fetchAllProducts, 
          fetchAllCollections,
          fetchCheckout, 
          fetchProductWithId, 
          addItemToCheckout, 
          updateQuantityInCart, 
          removeLineItemInCart
        }}>
            {props.children}
        </ShopContext.Provider>
    )
}

export const ShopConsumer = ShopContext.Consumer

export default ShopProvider;
