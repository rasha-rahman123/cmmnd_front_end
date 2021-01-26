import { useRouter } from 'next/router';
import React, {Component, useContext} from 'react';
import { Box } from 'rebass';
import { ShopContext } from '../context/ShopContext';
import LineItem from './LineItem';

export function Cart(props){
  function openCheckout() {
    window.location.assign(props.checkout.webUrl)
  }
    const {checkout, isCartOpen, closeCart} = useContext(ShopContext)

    let line_items = checkout && checkout.lineItems && checkout.lineItems.map((line_item) => {
      return (
        <LineItem

          key={line_item.id.toString()}
          line_item={line_item}
        />
      );
    });

    return (
     <Box onClick={() => closeCart()} sx={{width: '100vw', height: '100vh', bg: '#FFFFFF90', display: isCartOpen? 'flex' : 'none', zIndex: 0,justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, opacity: isCartOpen ? 1 : 0, transition: 'opacity 300ms ease 1s'}}>
        <div onClick={(e) => e.stopPropagation()} className={`Cart ${props.isCartOpen ? 'Cart--open' : ''}`}>
        <header className="Cart__header">
          <h2>Your cart</h2>
          <button
            onClick={props.handleCartClose}
            className="Cart__close">
            ×
          </button>
        </header>
        <ul className="Cart__line-items">
          {line_items}
        </ul>
        <footer className="Cart__footer">
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Subtotal</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {props.checkout.subtotalPrice}</span>
            </div>
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Taxes</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {props.checkout.totalTax}</span>
            </div>
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Total</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {props.checkout.totalPrice}</span>
            </div>
          </div>
          <button className="Cart__checkout button" onClick={() => openCheckout()}>Checkout</button>
        </footer>
      </div>
     </Box>
    )
  }

export default Cart;
