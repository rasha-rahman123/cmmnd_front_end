import { useRouter } from 'next/router';
import React, {Component, useContext, useEffect} from 'react';
import { Box } from 'rebass';
import { ShopContext } from '../../context/ShopContext';
import LineItem from '../../components/LineItem';

function Cart(){
  function openCheckout() {
    window.location.assign(checkout.webUrl);
  }
    const {checkout, isCartOpen} = useContext(ShopContext);
    const router = useRouter()
    const pw = router.query.pw || '';

    let lineItems = checkout && checkout.lineItems && checkout.lineItems.map((item) => {
      console.log("f")
      return (
        <LineItem
          key={item.id.toString()}
          line_item={item}
        />
      );
    });

    // if cart is not open then redirect
    useEffect(() => { 
      if(!isCartOpen) { 
        router.push({
          pathname: "/shop",
          query: {
            pw: pw,
          }
        })
        
      } 
    }, [isCartOpen])

    const shippingPrice = checkout.shippingLine ? checkout.shippingLine.price : 0;
    const taxTotal = checkout.totalTax ? checkout.totalTax : 0;

    const defaultText = "calculated at checkout";
    const shippingText = shippingPrice > 0 ? `$ ${checkout.shippingLine.price}` : defaultText;
    const taxText = taxTotal > 0 ? `$ ${checkout.totalTax}` : defaultText;

    return (
        <div className="cart-checkout-container">
          <h2>Your cart</h2>
          <div className="cart-labels cart-grid">
            <p className="cart-label-a">Items</p>
            <p className="cart-label-b">Quantity</p>
            <p className="cart-label-c">Price</p>
            <p className="cart-label-d">Remove</p>
          </div>
          <ul className="cart-line-items">
            {lineItems}
          </ul>

          <div className="cart-grid cart-footer">
              <h3 className="cart-info-total">Subtotal</h3>
              <div className="Cart-info-pricing">
                <p className="pricing">$ {checkout.subtotalPrice}</p>
              </div>
          </div>
          <div className="cart-grid cart-footer">
              <h3 className="cart-info-total">Shipping</h3>
              <div className="Cart-info-pricing">
                <p className="pricing">{shippingText}</p>
              </div>
          </div>
          <div className="cart-grid cart-footer">
              <h3 className="cart-info-total">Tax</h3>
              <div className="Cart-info-pricing">
                <p className="pricing">{taxText}</p>
              </div>
          </div>
          <div className="cart-grid cart-footer">
              <h3 className="cart-info-total">Total</h3>
              <div className="Cart-info-pricing">
                <p className="pricing">$ {checkout.totalPrice}</p>
              </div>
          </div>
          <div className="cart-checkout">
          <button className="cart-update button">Update Cart</button>
          <button className="button" onClick={() => openCheckout()}>Checkout</button>
          </div>
        </div>
    )
  }

export default Cart;
