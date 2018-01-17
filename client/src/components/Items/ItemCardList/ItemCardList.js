import React from 'react';
import Masonry from 'react-masonry-component';
import ItemCard from '../ItemCard/ItemCard';

const ItemCardList = props => {
  const styles = {
    masonry: {
      width: '90%',
      margin: '0 auto'
    }
  };

  const itemsList = props.items.map(item => {
    return <ItemCard key={item.id} data={item} clicked={props.clicked} />;
  });

  return <Masonry style={styles.masonry}>{itemsList}</Masonry>;
};

export default ItemCardList;
