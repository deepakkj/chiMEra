import React from 'react';
import { Button, Icon } from 'react-materialize';
import { connect } from 'react-redux';

function Cart(props) {
  return (
    <div className="container">
      <div className="row center">
        <h3>Cart</h3>
      </div>
      <div className="row">
        <table className="highlight">
          <thead>
            <tr>
              <th>Enhancement</th>
              <th>Pet</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Item Total</th>
            </tr>
          </thead>

          <tbody>
            {
              props.cart.map((item) => {
                const itemEnhancement = props.enhancements.find(enhancement =>
                  enhancement.id === item.enhancementId);
                const itemAnimal = props.animals.find(animal => animal.id === item.animalId);
                return (
                  <tr key={item.id}>
                    <td>{itemEnhancement.name}</td>
                    <td>{itemAnimal.name}</td>
                    <td>{+itemEnhancement.price + +itemAnimal.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td><Button floating className="red" waves="light" icon="delete" /></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col s6"><h3>Total: ${
          props.cart.reduce((sum, item) => sum + +item.price, 0)
        }</h3></div>
        <div className="col s6">
          <Button waves="light">Purchase<Icon right>hot_tub</Icon></Button>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    cart: state.cart,
    enhancements: state.enhancements,
    animals: state.animals,
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
