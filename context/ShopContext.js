import { createContext, useEffect, useState } from 'react';
import Client from 'shopify-buy'

// makes requests
// changes values in context
export const ShopContext = createContext();

export const client = Client.buildClient({
    storefrontAccessToken: '7df2142caeb8ea3b206bfb4ba39d3fa9',//process.env.API_TOKEN,
    domain: 'cmmndllc.myshopify.com'//process.env.STORE_URL
});

  

function ShopProvider(props) {
    const [isCartOpen, setIsCartOpen] = useState(true)
    const [checkout, setCheckout] = useState({})
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [collections, setCollections] = useState([])

    useEffect(() => {
        if (localStorage.checkout) {
            fetchCheckout(localStorage.checkout);
          } else {
            createCheckout();
          }
    },[])

    const createCheckout = async () => {
        const checkout = await client.checkout.create();
        localStorage.setItem("checkout", checkout.id);
        await setCheckout(checkout);
      };
    
    const fetchCheckout = async (checkoutId) => {
        client.checkout
          .fetch(checkoutId)
          .then((checkout) => {
           setCheckout(checkout)
          })
          .catch((err) => console.log(err));
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
            console.log(check)
    
        openCart();
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

      const updateQuantityInCart = async (lineItemId, quantity) => {
        const checkoutId = checkout.id;
        const lineItemsToUpdate = [
          { id: lineItemId, quantity: parseInt(quantity, 10) },
        ];

        const check = await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate)
        setCheckout(check)
      }
    
      const removeLineItemInCart = async (lineItemId) => {
        const checkoutId = checkout.id;
        const check = await client.checkout.removeLineItems(checkoutId, [lineItemId])
        setCheckout(check)
      }
    
    const closeCart = () => {
       setIsCartOpen(false)
      };
      const openCart = () => {
        setIsCartOpen(true)
      };

    return (
        <ShopContext.Provider value={{
          client,
          isCartOpen,
          checkout,
          products,
          product, 
          collections,
          setIsCartOpen,
          setCheckout, 
          setProducts, 
          setProduct,
          openCart, 
          closeCart, 
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
