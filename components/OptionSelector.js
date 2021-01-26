import React, {Component} from 'react';

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
          console.log(value.value, 'vall')
    
          return (
            <option value={value} key={`${props.option.name}-${value}`}>{value.value}</option>
          )
        })}
      </select>
      </div>
    );
}

export default OptionSelector;
