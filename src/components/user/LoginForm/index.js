import React, { memo } from 'react';
import { func } from 'prop-types';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';

import { REJECTED, PENDING } from 'constants/actionStatusConstants';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { login as loginValidations } from 'utils/constraints';
import { useStatus, useForm, useValidation, useTextInputProps } from 'hooks';
import { login } from 'state/actions/userActions';
import Button from 'components/common/Button';

import './styles.scss';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' }
});

const fields = {
  email: 'email',
  password: 'password'
};

export const LoginForm = ({ onSubmit }) => {
  const intl = useIntl();
  const { status, error } = useStatus(login);
  const validator = useValidation(loginValidations);
  const {
    values,
    errors,
    handleValueChange,
    handleSubmit,
    handleFocus,
    handleBlur,
    activeFields,
    touched
  } = useForm(
    {
      onSubmit,
      validator,
      validateOnBlur: true
    },
    [onSubmit]
  );

  const inputProps = useTextInputProps(
    handleValueChange,
    handleFocus,
    handleBlur,
    values,
    errors,
    activeFields,
    touched
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <form role="form" className="login-form" onSubmit={handleSubmit}>
      {status === REJECTED && <strong>{error}</strong>}
      <div className="login-form__control">
        <Input
          name="email"
          type="email"
          label={intl.formatMessage(messages.email)}
          {...inputProps(fields.email)}
        />
      </div>
      <div className="login-form__control">
        <Input
          name="password"
          type="password"
          label={intl.formatMessage(messages.password)}
          {...inputProps(fields.password)}
        />
      </div>
      <Button type="submit" disabled={status === PENDING}>
        <FormattedMessage id="login.form.submit" />
      </Button>
      {status === PENDING && <Loading />}
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: func.isRequired
};

export default memo(LoginForm);
