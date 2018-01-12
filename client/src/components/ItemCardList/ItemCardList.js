import React from 'react';
import Masonry from 'react-masonry-component';
import ItemCard from '../ItemCard/ItemCard';

const ItemCardList = ({ items }) => {
  const styles = {
    container: { width: '100%' }
  };

  const itemsList = items.map(item => {
    return <ItemCard key={item.id} data={item} />;
  });

  return <Masonry style={styles.container}>{itemsList}</Masonry>;
};

export default ItemCardList;
