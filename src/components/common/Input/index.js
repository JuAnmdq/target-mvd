import React, { useEffect } from 'react';
import { arrayOf, bool, func, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { parseInputErrors } from 'utils/helpers';

import './styles.scss';

const Input = ({ label, name, value, onChange, errors, active, touched, ...props }) => {
  // Register field in the form
  useEffect(() => {
    onChange({ target: { value } }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="input">
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        <input
          className="input__box"
          name={name}
          value={value}
          id={name}
          onChange={onChange}
          {...props}
        />
        {touched && errors && (
          <div className="input__error">
            <FormattedMessage
              id={parseInputErrors(errors)}
              defaultMessage={parseInputErrors(errors)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  name: string.isRequired,
  label: string,
  value: string,
  onChange: func.isRequired,
  errors: arrayOf(string),
  active: bool.isRequired,
  touched: bool.isRequired
};

export default Input;
