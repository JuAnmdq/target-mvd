import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import faker from 'faker';

import render from 'utils/testHelpers';
import LoginForm from '.';

const DEFAULT_PROPS = {
  onSubmit: jest.fn()
};

test('LoginForm shows the expected form', () => {
  render(<LoginForm {...DEFAULT_PROPS} />);

  expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Password$/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sign In/ })).toBeInTheDocument();
});

test('LoginForm shows exceptions when fields are not presents', () => {
  render(<LoginForm {...DEFAULT_PROPS} />);

  fireEvent.submit(screen.getByRole('form'));

  expect(screen.getByText(/You must enter an email to continue/)).toBeInTheDocument();
  expect(screen.getByText(/You must enter a password to continue/)).toBeInTheDocument();
});

test('LoginForm shows an exception when email is not valid', () => {
  render(<LoginForm {...DEFAULT_PROPS} />);

  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'johndoe@wrongmail' } });
  fireEvent.blur(screen.getByLabelText(/^Email$/));

  expect(screen.getByText(/You must enter a valid email/)).toBeInTheDocument();
});

test('LoginForm shows an exception when password length is smaller than 8 characters', () => {
  const password = faker.internet.password(5);

  render(<LoginForm {...DEFAULT_PROPS} />);

  const passwordEl = screen.getByLabelText(/^Password$/);

  fireEvent.change(passwordEl, { target: { value: password } });
  fireEvent.blur(passwordEl);

  expect(screen.getByText(/Password must be at least 8 characters/)).toBeInTheDocument();
});

test('LoginForm sign up user when send correct user data', async () => {
  render(<LoginForm {...DEFAULT_PROPS} />);

  const email = faker.internet.email();
  const password = faker.internet.password(8);

  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: email } });
  fireEvent.change(screen.getByLabelText(/^Password$/), { target: { value: password } });

  fireEvent.submit(screen.getByRole('form'));

  expect(DEFAULT_PROPS.onSubmit).toHaveBeenCalledTimes(1);
  expect(DEFAULT_PROPS.onSubmit).toHaveBeenCalledWith({
    email,
    password
  });

  // @TODO: technical debt mock and stub response to complete real flow
});
