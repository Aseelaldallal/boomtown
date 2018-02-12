import React from 'react';
import ItemCard from '../../components/Items/ItemCard/ItemCard';

const Share = props => {
  return (
    <ItemCard
      data={{
        borrower: null,
        created: null,
        tags: ['Household Items'],
        description: 'blah',
        title: 'blah blah',
        imageURL: 'http://bit.ly/2x8hlfh',
        itemowner: {
          _id: '122333333',
          jwt: { email: 'aseelaldallal@gmail.com' }
        }
      }}
    />
  );
};

export default Share;
