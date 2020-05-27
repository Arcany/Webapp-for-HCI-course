import React from 'react';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';

export interface CheckboxButtonProps {
  checked: boolean;
  onClick: (checked: boolean) => void;
}

export default class CheckboxButton extends React.PureComponent<CheckboxButtonProps, {}>{
  render() {
    return (
      <Button className="primaryButton checkboxButton" onClick={() => {this.props.onClick(!this.props.checked);}}>
        <FormCheck checked={this.props.checked} onChange={() => {return;}} />
        {this.props.children}
      </Button>
    );
  }
}