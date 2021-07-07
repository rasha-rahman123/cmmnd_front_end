import React, {useContext,useState} from 'react';
import { ShopContext } from '../context/ShopContext';

function LineItem(props) {

  const {updateQuantityInCart,removeLineItemInCart} = useContext(ShopContext)

  const [quantity, setQuantity] = useState(props.line_item.quantity);

    // TODO: make this async and check for quantity!!
    function handleChange(e) {
      const num = e.target.value;
      updateQuantityInCart(props.line_item.id, num);
      setQuantity(num);
    }

    function handleRemove(id) { 
        removeLineItemInCart(id)
    }

    return (
        <li className="line-item cart-grid">
        <div className="line-item-img">
            {props.line_item.variant.image ? <img src={props.line_item.variant.image.src} alt={`${props.line_item.title} product shot`}/> : null}
        </div>
        {/* <div className="Line-item__content"> */}
            <div className="Line-item__content-row">
            <p className="Line-item__title">
                {props.line_item.title}
            </p>
            <p className="Line-item__variant-title">
                {props.line_item.variant.title}
            </p>
            </div>
            {/* <div className="Line-item__content-row"> */}
                {/* <button className="Line-item__quantity-update" onClick={() => decrementQuantity(props.line_item.id)}>-</button> */}
                <input type="number" value={quantity} onChange={handleChange} className="line-item-quantity"/>
                {/* <button className="Line-item__quantity-update" onClick={() => incrementQuantity(props.line_item.id)}>+</button> */}
            <p className="Line-item__price">
                $ { (props.line_item.quantity * props.line_item.variant.price).toFixed(2) }
            </p>
            <button className="text-button" onClick={()=> handleRemove(props.line_item.id)}><p>Remove</p></button>
            {/* </div> */}
        {/* </div> */}
        </li>
    );
  }

export default LineItem;
