import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiCart, mdiHeart } from '@mdi/js';

import styles from './Topbar.module.scss';
import { ReduxProps } from '../containers/TopbarContainer';

export interface StateProps {
  cartPrice: string;
  cartItemCount: number;
}

class Topbar extends React.Component<ReduxProps, {}> {
  render() {
    return (
      <Navbar expand="lg" className={styles.topbar}>
        <Navbar.Brand className={styles.brand}>
          <Link to="/">Brand name</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggleBtn} />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className={styles.userActions}>
            {/* TODO: Do something else with the favorite. */}
            <Link to="/checkout" className={styles.iconBtn}>
              <Icon path={mdiHeart} size={1.3} className={styles.heartIcon} />
            </Link>
            <Link to="/checkout" className={styles.iconBtn}>
              <Icon path={mdiCart} size={1.3} />
              <span className={styles.cartPrice}>{this.props.cartPrice}€</span>
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Topbar;
