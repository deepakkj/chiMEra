import React from 'react';
import { Row, Input } from 'react-materialize';

class AddToCartCard extends React.Component {
  constructor() {
    super();

    this.state = {
      quantity: 1,
    };

    this.quantitySelect = this.quantitySelect.bind(this);
    this.constructQuantityArray = this.constructQuantityArray.bind(this);
  }

  quantitySelect(e) {
    this.setState({ quantity: +e.target.value });
  }

  constructQuantityArray() {
    let length;
    if (this.props.selectedPet.inventory > this.props.selectedEnhancement.inventory) {
      length = this.props.selectedEnhancement.inventory;
    } else {
      length = this.props.selectedPet.inventory
    }
    if (length > 10) length = 10;
    const result = [];
    for (let i = 1; i <= length; i++) {
      result.push(i);
    }
    return result;
  }

  render() {
    const { selectedPet, selectedEnhancement, addItem } = this.props;
    return (
      <div>
        <h5>A pet, but better!</h5>
        <div id="add-to-cart-card">
          <div>
            <img
              width="100"
              src={selectedPet.imageUrl}
            />
            <img
              width="100"
              src={selectedEnhancement.imageUrl}
            />
          </div>
          <div>
            <h5>{selectedPet.name} with a {selectedEnhancement.name} enhancement</h5>
            <div id="quantity-selector">
              <label display="inline" htmlFor="quantity">Quantity: </label>
              <Row>
                <Input s={12} type='select' onChange={this.quantitySelect}>
                  {
                    this.constructQuantityArray().map((num) => {
                      return <option key={num} value={num}>{num}</option>
                    })
                  }
                </Input>
              </Row>
              <p>${+selectedPet.price + +selectedEnhancement.price} each</p>
            </div>
          </div>
          <div>
            <p>Total: ${this.state.quantity * (+selectedPet.price + +selectedEnhancement.price) }</p>
            <button
              onClick={() => addItem({
                animalId: selectedPet.id,
                enhancementId: selectedEnhancement.id,
                price: (this.state.quantity * (+selectedPet.price + +selectedEnhancement.price)).toFixed(2),
                quantity: this.state.quantity,
              })}
              className="btn waves-effect waves-light"
              type="submit"
              name="action">
              Add to Cart
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddToCartCard;
