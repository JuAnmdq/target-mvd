import React, { memo } from 'react';
import { func } from 'prop-types';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';

import { REJECTED, PENDING } from 'constants/actionStatusConstants';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import Select from 'components/common/Select';
import Button from 'components/common/Button';
import { signUp as signUpValidations } from 'utils/constraints';
import {
  useStatus,
  useForm,
  useValidation,
  useTextInputProps,
  useSelectProps,
  useSelectOptions
} from 'hooks';
import { signUp } from 'state/actions/userActions';
import { DEFAULT_GENDER_VALUE } from 'constants/constants';

import './styles.scss';

const messages = defineMessages({
  username: { id: 'signup.form.username' },
  email: { id: 'login.form.email' },
  gender: { id: 'signup.form.gender' },
  genderDefaultValue: { id: 'signup.form.gender.defaultValue' },
  genders: {
    male: { id: 'signup.form.genders.male' },
    female: { id: 'signup.form.genders.female' }
  },
  password: { id: 'login.form.password' },
  passwordPlaceholder: { id: 'signup.form.password.placeholder' },
  passConfirmation: { id: 'signup.form.passconfirmation' }
});

const fields = {
  username: 'username',
  email: 'email',
  gender: 'gender',
  password: 'password',
  passwordConfirmation: 'passwordConfirmation'
};

export const SignUpForm = ({ onSubmit }) => {
  const intl = useIntl();
  const { status, error } = useStatus(signUp);
  const options = useSelectOptions([
    {
      name: intl.formatMessage(messages.genderDefaultValue),
      id: DEFAULT_GENDER_VALUE,
      disabled: true
    },
    {
      name: intl.formatMessage(messages.genders.male),
      id: 'male'
    },
    {
      name: intl.formatMessage(messages.genders.female),
      id: 'female'
    }
  ]);

  const validator = useValidation(signUpValidations);
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

  const selectProps = useSelectProps(
    handleValueChange,
    handleFocus,
    handleBlur,
    values,
    errors,
    activeFields,
    touched,
    DEFAULT_GENDER_VALUE
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <form role="form" className="sign-up-form" onSubmit={handleSubmit}>
      {status === REJECTED && <strong>{error}</strong>}
      <div className="sign-up-form__control">
        <Input
          name="username"
          label={intl.formatMessage(messages.username)}
          type="text"
          {...inputProps(fields.username)}
        />
      </div>
      <div className="sign-up-form__control">
        <Input
          name="email"
          label={intl.formatMessage(messages.email)}
          type="email"
          {...inputProps(fields.email)}
        />
      </div>
      <div className="sign-up-form__control">
        <Input
          name="password"
          type="password"
          label={intl.formatMessage(messages.password)}
          placeholder={intl.formatMessage(messages.passwordPlaceholder)}
          {...inputProps(fields.password)}
        />
      </div>
      <div className="sign-up-form__control">
        <Input
          name="passwordConfirmation"
          type="password"
          label={intl.formatMessage(messages.passConfirmation)}
          {...inputProps(fields.passwordConfirmation)}
        />
      </div>
      <div className="sign-up-form__control">
        <Select
          name="gender"
          label={intl.formatMessage(messages.gender)}
          options={options}
          {...selectProps(fields.gender)}
        />
      </div>
      <Button type="submit">
        <FormattedMessage id="login.form.submit" />
      </Button>
      {status === PENDING && <Loading />}
    </form>
  );
};

SignUpForm.propTypes = {
  onSubmit: func.isRequired
};

export default memo(SignUpForm);
