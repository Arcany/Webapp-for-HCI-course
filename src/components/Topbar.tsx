import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiCart, mdiHeart } from '@mdi/js';

import styles from './Topbar.module.scss';

class Topbar extends React.Component {
  render() {
    return (
      <Navbar expand="lg" className={styles.topbar}>
        <Navbar.Brand className={styles.brand}>
          <Link to="/">Brand name</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggleBtn} />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className={styles.userActions}>
            <Link to="/checkout" className={styles.iconBtn}>
              <Icon path={mdiHeart} size={1.3} className={styles.heartIcon} />
            </Link>
            <Link to="/checkout" className={styles.iconBtn}>
              <Icon path={mdiCart} size={1.3} />
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Topbar;
