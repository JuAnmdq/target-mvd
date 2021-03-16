import React from 'react';
import { node, bool, oneOf, func } from 'prop-types';

import './styles.scss';

const Button = ({ children, type, disabled, ...props }) => (
  // Dynamic button's type prop Discussion: https://github.com/yannickcr/eslint-plugin-react/issues/1555
  // eslint-disable-next-line react/button-has-type
  <button type={type} disabled={disabled} className="button" {...props}>
    {children}
  </button>
);

Button.propTypes = {
  children: node.isRequired,
  type: oneOf(['button', 'submit', 'reset']),
  disabled: bool,
  onClick: func
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: null
};

export default React.memo(Button);
