import React from 'react';
import Masonry from 'react-masonry-component';
import ItemCard from '../ItemCard/ItemCard';

const ItemCardList = ({ items }) => {
  const styles = {
    masonry: {
      width: '90%',
      margin: '0 auto'
    }
  };

  const itemsList = items.map(item => {
    return <ItemCard key={item.id} data={item} />;
  });

  return <Masonry style={styles.masonry}>{itemsList}</Masonry>;
};

export default ItemCardList;
