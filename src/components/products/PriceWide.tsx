import React, { CSSProperties } from 'react';
import styles from './PriceWide.module.scss';

interface Props {
  price: number;
  label?: string;
  size?: number;
}

export default class PriceWide extends React.Component<Props, {}> {
  render() {
    const rootStyle: CSSProperties = {};
    if (this.props.size) {
      rootStyle.fontSize = `${this.props.size}px`;
    }

    return (
      <div className={styles.priceRoot} style={rootStyle}>
        <span className={styles.main}>{Math.trunc(this.props.price)}</span>
        <span className={styles.sub}>{((this.props.price - Math.trunc(this.props.price)) * 100).toFixed(0)}€</span>
        {this.props.label &&
          <span className={styles.separator}>/</span>
        }
        {this.props.label &&
          <span className={styles.label}>{this.props.label}</span>
        }
      </div>
    );
  }
}