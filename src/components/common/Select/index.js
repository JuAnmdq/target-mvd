import React, { useEffect } from 'react';
import { arrayOf, bool, func, string, number, shape, oneOfType } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { parseInputErrors } from 'utils/helpers';

const Select = ({ label, name, value, onChange, errors, active, touched, options, ...props }) => {
  // Register field in the form
  useEffect(() => {
    onChange({ target: { value } }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        <select name={name} value={value} id={name} onChange={onChange} {...props}>
          {options.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {errors && (
          <span>
            <FormattedMessage
              id={parseInputErrors(errors)}
              defaultMessage={parseInputErrors(errors)}
            />
          </span>
        )}
      </div>
    </div>
  );
};

Select.propTypes = {
  name: string.isRequired,
  value: oneOfType([string, number]).isRequired,
  label: string,
  onChange: func.isRequired,
  errors: arrayOf(string),
  active: bool.isRequired,
  touched: bool.isRequired,
  options: arrayOf(
    shape({
      label: string.isRequired,
      value: oneOfType([string, number]).isRequired
    })
  )
};

export default Select;
