import React from 'react';
import { Collection, CollectionItem, Row, Input } from 'react-materialize';
import ProductCard from './ProductCard.jsx';

export default function EnhancementCard({ enhancements, handleEnhanceSelect, selectedEnhancement }) {
  return (
    <Collection header="Step 2: Pick an Enhancement">
      <CollectionItem>
        <Row>
          <Input s={12} type='select' label="Choose an enhancement" onChange={handleEnhanceSelect}>
            {
              enhancements.map((enhancement) => {
                return <option key={enhancement.id} value={enhancement.id}>{enhancement.name}</option>
              })
            }
          </Input>
        </Row>
      </CollectionItem>
      <CollectionItem>
        <ProductCard product={selectedEnhancement} />
      </CollectionItem>
    </Collection>
  );
}