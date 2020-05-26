import React from 'react';
import styles from './FormSteps.module.scss';

export interface FormStepsProps {
  stepIndex: number;
  // disableForward: boolean;
}

const steps = [
  'Shopping cart',
  'Shipping',
  'Payment'
];

// const links = [
//   '/checkout',
//   '/shipping',
//   '/payment'
// ];

export default class FormSteps extends React.Component<FormStepsProps, {}> {
  render() {
    const stepIndex = this.props.stepIndex;
    return (
      <div className={styles.root}>
        {steps.map((name, index) =>
          <div className={`${styles.step} ${index > stepIndex ? styles.inactive : ''}`}>
            <span className={styles.stepNr}>
              {index + 1}
            </span>
            {name}
            <span className={`${styles.line} ${index < stepIndex ? styles.lineActive : ''}`}></span>
          </div>
        )}
      </div>
    );
  }
}