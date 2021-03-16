import validate from 'validate.js';
import { DEFAULT_GENDER_VALUE } from 'constants/constants';

export const login = {
  email: {
    presence: { message: 'email.presence' },
    email: { message: 'email.invalid' }
  },
  password: {
    presence: { message: 'password.presence' },
    length: {
      minimum: 8,
      message: 'password.minlength'
    }
  }
};

export const signUp = {
  username: {
    presence: { message: 'username.presence' }
  },
  gender: {
    presence: true,
    exclusion: {
      within: [DEFAULT_GENDER_VALUE],
      message: 'gender.presence'
    }
  },
  email: {
    presence: { message: 'email.presence' },
    email: { message: 'email.invalid' }
  },
  password: {
    presence: { message: 'password.presence' },
    length: {
      minimum: 8,
      message: 'password.minlength'
    }
  },
  passwordConfirmation: {
    presence: { message: 'passwordConfirmation.presence' },
    equality: {
      attribute: 'password',
      message: 'passwordConfirmation.equality'
    }
  }
};

validate.validators.presence.options = { allowEmpty: false };

export const validations = (constraints, props = {}) => data =>
  validate(data, constraints, props) || {};
