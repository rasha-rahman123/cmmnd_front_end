import React, {Component} from 'react';
import {ShopContext} from '../context/ShopContext';

const OptionSelector = (props) => {
    return (
      <div>
      <h5>{props.option.name}</h5>
      <select
        className="product-option"
        name={props.option.name}
        key={props.option.name}
        onChange={props.handleOptionChange}
      >
        {props.option.values.map((value) => {
    
          return (
            <option value={value} key={`${props.option.name}-${value}`}>{value.value}</option>
          )
        })}
      </select>
      </div>
    );
}

export default OptionSelector;
