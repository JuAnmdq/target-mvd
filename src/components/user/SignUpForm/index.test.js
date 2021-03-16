import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from 'faker';

import { withStore } from 'utils/testHelpers';

import SignUpForm from '.';

const DEFAULT_PROPS = {
  onSubmit: jest.fn()
};

test('SignUpForm renders without crashing', () => {
  const { asFragment } = render(withStore(<SignUpForm {...DEFAULT_PROPS} />));
  expect(asFragment()).toBeDefined();
});

test('SignUpForm shows the expected form', () => {
  render(withStore(<SignUpForm {...DEFAULT_PROPS} />));

  expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Password$/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Min. 8 characters long/)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Confirm Password$/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Gender/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sign Up/ })).toBeInTheDocument();
});

test('SignUpForm shows exceptions when fields are not presents', () => {
  render(withStore(<SignUpForm {...DEFAULT_PROPS} />));

  fireEvent.submit(screen.getByRole('form'));

  expect(screen.getByText(/You must enter an username to continue/i)).toBeInTheDocument();
  expect(screen.getByText(/You must enter an email to continue/)).toBeInTheDocument();
  expect(screen.getByText(/You must enter a password to continue/)).toBeInTheDocument();
  expect(
    screen.getByText(/You must enter a password confirmation to continue/)
  ).toBeInTheDocument();
  expect(screen.getByText(/You must enter a gender to continue/)).toBeInTheDocument();
});

test('SignUpForm shows an exception when email is not valid', () => {
  render(withStore(<SignUpForm {...DEFAULT_PROPS} />));

  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'johndoe@wrongmail' } });
  fireEvent.blur(screen.getByLabelText(/^Email$/));

  expect(screen.getByText(/You must enter a valid email/)).toBeInTheDocument();
});

test('SignUpForm shows an exception when password length is smaller than 8 characters', () => {
  const password = faker.internet.password(5);

  render(withStore(<SignUpForm {...DEFAULT_PROPS} />));

  const passwordEl = screen.getByLabelText(/^Password$/);

  fireEvent.change(passwordEl, { target: { value: password } });
  fireEvent.blur(passwordEl);

  expect(screen.getByText(/Password must be at least 8 characters/)).toBeInTheDocument();
});

test('SignUpForm shows an exception when passwords fields do not match', () => {
  const password1 = faker.internet.password();
  const password2 = faker.internet.password();

  render(withStore(<SignUpForm {...DEFAULT_PROPS} />));

  const confirmPasswordEl = screen.getByLabelText(/^Confirm Password$/);

  fireEvent.change(screen.getByLabelText(/^Password$/), { target: { value: password1 } });
  fireEvent.change(confirmPasswordEl, { target: { value: password2 } });
  fireEvent.blur(confirmPasswordEl);

  expect(
    screen.getByText(/Your password confirmation must be equal to the password/)
  ).toBeInTheDocument();
});

test('SignUpForm sign up user when send correct user data', async () => {
  render(withStore(<SignUpForm {...DEFAULT_PROPS} />));

  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password(8);
  const gender = 'male';

  fireEvent.change(screen.getByLabelText(/Name/), { target: { value: username } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: email } });
  fireEvent.change(screen.getByLabelText(/^Password$/), { target: { value: password } });
  fireEvent.change(screen.getByLabelText(/^Confirm Password$/), { target: { value: password } });
  fireEvent.change(screen.getByLabelText(/Gender/), { target: { value: gender } });

  fireEvent.submit(screen.getByRole('form'));

  expect(DEFAULT_PROPS.onSubmit).toHaveBeenCalledTimes(1);
  expect(DEFAULT_PROPS.onSubmit).toHaveBeenCalledWith({
    email,
    gender,
    password,
    passwordConfirmation: password,
    username
  });

  // @TODO: technical debt mock and stub response to complete real flow
});
