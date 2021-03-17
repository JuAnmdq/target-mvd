import React from 'react';
import { screen } from '@testing-library/react';

import render from 'utils/testHelpers';
import LoginPage from '.';

test('LoginPage renders without crashing', () => {
  const { asFragment } = render(<LoginPage />);
  expect(asFragment()).toBeDefined();
});

test('SignUpForm shows a title, subtitle, info, an app logo, a forgot password link, facebook connect link, a sign in link and a form', () => {
  render(<LoginPage />);

  expect(screen.getByRole('heading', { level: 1, name: /Target MVD/i })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { level: 2, name: /Find people near you & Connect/i })
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      /Create a target wherever on the map, specify your interest: Travel, Dating, Music, etc and start conecting with others who share your interest./i
    )
  ).toBeInTheDocument();
  expect(screen.getByTestId('logo')).toBeInTheDocument();
  expect(screen.getByText(/Forgot your password/).closest('a')).toHaveAttribute('href', '/');
  expect(screen.getByText(/Connect with facebook/i).closest('a')).toHaveAttribute('href', '/');
  expect(screen.getByRole('form')).toBeInTheDocument();
  expect(screen.getByText(/sign up/i).closest('a')).toHaveAttribute('href', '/sign-up');
});
