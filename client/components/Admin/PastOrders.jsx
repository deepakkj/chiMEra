import React from 'react';
import { connect } from 'react-redux';
import { Row, Table } from 'react-materialize';
import { fetchAdminPastOrders } from '../../store/pastOrders';

class Carts extends React.Component{
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div className="container">
        {this.props.pastOrders.map((cart)=> {
          return (
            <Row key={cart.id}>
              <h5 className="order-id">Order# {cart.id}</h5>
              <Table className="highlight">
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
                    cart.pastOrderItems.map((item) => {
                      const itemEnhancement = this.props.enhancements.find(enhancement =>
                        enhancement.id === item.enhancementId);
                      const itemAnimal = this.props.animals.find(animal => animal.id === item.animalId);
                      return (
                        <tr key={item.id}>
                          <td>{itemEnhancement.name}</td>
                          <td>{itemAnimal.name}</td>
                          <td>{+itemEnhancement.price + +itemAnimal.price}</td>
                          <td>{+item.quantity}</td>
                          <td>{item.quantity * (+itemEnhancement.price + +itemAnimal.price)}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
              <div className="row">
                <div className="col s11"><p>Total: ${
                  cart.pastOrderItems.reduce((sum, item) => sum + +item.price, 0)
                }</p></div>
              </div>
            </Row>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    pastOrders: state.pastOrders,
    animals: state.animals,
    enhancements: state.enhancements,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchAdminPastOrders());
    },
  };
};

export default connect(mapState, mapDispatch)(Carts);
