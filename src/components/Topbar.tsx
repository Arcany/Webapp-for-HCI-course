import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link, RouteComponentProps } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiCart, mdiHeart } from '@mdi/js';
import { ProductMap } from '../redux/state';
import styles from './Topbar.module.scss';
import { ReduxProps } from '../containers/TopbarContainer';
import { Dropdown, ButtonGroup, OverlayTrigger, Tooltip, FormControl } from 'react-bootstrap';

export interface StateProps {
  cartPrice: string;
  cartItemCount: number;
  products: ProductMap;
  searchFilter: string;
}

export interface TopbarProps {
  showSearch: boolean;
}

class Topbar extends React.PureComponent<ReduxProps & RouteComponentProps & TopbarProps, {}> {
  render() {
    const dropdownProducts = () => {
      if (Object.keys(this.props.products).length === 0) {
        return (
          <Dropdown.Item className={styles.cartDropdownItem} key="empty">
            Cart is empty
          </Dropdown.Item>
        );
      }
      const lastEntryKey = Object.keys(this.props.products)[Object.keys(this.props.products).length-1];
      return Object.entries(this.props.products).map(([key, value]) => {
        if (key === lastEntryKey) {
          return (
            <React.Fragment key={key}>
              <Dropdown.Item className={styles.cartDropdownItem}>
                {value.name} x{value.cartAmount ||''}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className={styles.cartDropdownItem}>
                Total price: {this.props.cartPrice}€
              </Dropdown.Item>
            </React.Fragment>
          );
        } return (
          <React.Fragment key={key}>
            <Dropdown.Item className={styles.cartDropdownItem}>
              {value.name} x{value.cartAmount ||''}
            </Dropdown.Item>
            <Dropdown.Divider />
          </React.Fragment>
        );
      });
    };

    const cartDropdown = (
      <Dropdown as={ButtonGroup} alignRight>
        <Link to="/checkout" className={styles.iconBtn}>
          <Icon path={mdiCart} size={1.3} />
          <span className={styles.cartPrice}>{this.props.cartPrice}€</span>
        </Link>

        <Dropdown.Toggle className={styles.cartDropdownToggle} split id="dropdown-custom-2" />
        <Dropdown.Menu>
          {dropdownProducts()}
        </Dropdown.Menu>
      </Dropdown>
    );

    return (
      <Navbar expand="lg" className={styles.topbar}>
        <Navbar.Brand className={styles.brand}>
          <Link to="/">Brand name</Link>
        </Navbar.Brand>

        {this.props.showSearch &&
          <FormControl type="text" placeholder="Search..." value={this.props.searchFilter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.setSearchFilter(e.target.value)} />
        }

        <div className={styles.userActions}>
          {cartDropdown}
        </div>
      </Navbar>
    );
  }
}

export default Topbar;
