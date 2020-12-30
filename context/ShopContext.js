import { createContext, useEffect, useState } from 'react';
import Client from 'shopify-buy'

const ShopContext = createContext()

const client = Client.buildClient({
    storefrontAccessToken: "04f444946d9575dc71eda675be75715b",
    domain: 'cmmnddev.myshopify.com'
  });

export function ShopProvider(props) {
    const [isCartOpen, setIsCartOpen] = useState()
    const [checkout, setCheckout] = useState({})
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})

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
    
      const fetchAllProducts = async () => {
        const products = await client.product.fetchAll();
        setProducts(products)
      
      };
    
      const fetchProductWithId = async (id) => {
        const product = await client.product.fetch(id);
       setProduct(product)
        console.log(product)
    
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
        <ShopContext.Provider value={{isCartOpen,setIsCartOpen,setCheckout, setProducts, setProduct,checkout,products,product, openCart, closeCart, fetchAllProducts, fetchCheckout, fetchProductWithId, addItemToCheckout, updateQuantityInCart, removeLineItemInCart}}>
            {props.children}
        </ShopContext.Provider>
    )
}
const ShopConsumer = ShopContext.Consumer

export {ShopConsumer, ShopContext}
export default ShopProvider;
