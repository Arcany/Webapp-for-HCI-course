import React, { SyntheticEvent } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import FormCheck from 'react-bootstrap/FormCheck';
import FormControl from 'react-bootstrap/FormControl';
import Badge from 'react-bootstrap/Badge';
import styles from './FilterDropdown.module.scss';

export interface FilterDropdownProps {
  id: string;
  items: string[];
  selectedItems: string[];
  onItemSelect?: (item: string, checked: boolean) => void;
}

export interface FilterDropdownState {
  filterString: string;
  open: boolean;
}

export default class FilterDropdown extends React.Component<FilterDropdownProps, FilterDropdownState>{
  constructor(props: FilterDropdownProps) {
    super(props);
    this.state = {
      filterString: '',
      open: false
    };
  }

  render() {
    const selectedItemCount = this.props.selectedItems.length;

    return (
      <Dropdown alignRight show={this.state.open} onToggle={(isOpen: boolean, event: SyntheticEvent<Dropdown>, metadata: { source: 'select' | 'click' | 'rootClose' | 'keydown' }) => {
        if (metadata.source === 'select') { // Prevent dropdown from closing, when a filter item is selected.
          return;
        }
        this.setState({open: isOpen});
      }}>
        <Dropdown.Toggle id={this.props.id} className={'primaryButton'}>
          Origin
          <Badge variant="light" pill>{selectedItemCount > 0 ? selectedItemCount : ''}</Badge>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Header className={styles.header}>
            <FormControl value={this.state.filterString} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({filterString: e.target.value});
            }} className={styles.dropdownFilter} type="text" size="sm" placeholder="Filter" />
          </Dropdown.Header>
          <Dropdown.Divider />
          <div className={styles.itemScrollView}>
            {this.props.items.filter((item) => item.toLowerCase().includes(this.state.filterString.toLowerCase())).map((item) => {
              const isChecked = this.props.selectedItems.includes(item);
              return (
                <Dropdown.Item as="button" eventKey={item} key={item} className={styles.dropdownItem} onClick={() => {
                  console.log('Click');
                  if (this.props.onItemSelect) {
                    this.props.onItemSelect(item, !isChecked);
                  }
                }}>
                  <FormCheck type="checkbox" checked={isChecked} id={`filter-dropdown-item-check-${item}`} onChange={() => {return;}} />
                  <span>{item}</span>
                </Dropdown.Item>
              );
            })}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}