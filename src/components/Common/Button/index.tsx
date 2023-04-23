import React from 'react';

import cx from 'clsx';

import styles from './button.module.scss';

type ButtonColor = 'primary' | 'secondary';

interface Props extends React.ComponentProps<'button'> {
  color?: ButtonColor;
}

const Button: React.FC<Props> = ({
  className,
  children,
  color = 'primary',
  ...props
}) => {
  return (
    <button className={cx(styles.button, styles[color], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
