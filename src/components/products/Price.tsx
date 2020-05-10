import React from 'react';
import styles from './Price.module.scss';

interface Props {
  price: number;
  label: string;
}

export default class Price extends React.Component<Props, {}> {
  render() {
    return (
      <div className={styles.productPrice}>
        <span className={styles.priceMain}>{this.props.price.toFixed(0)}</span>
        <div className={styles.priceCol}>
          <span className={styles.priceSecondary}>
            {((this.props.price - Math.trunc(this.props.price)) * 100).toFixed(0)}
          </span>
          <span className={styles.priceLabel}>/pcs</span>
        </div>
      </div>
    );
  }
}