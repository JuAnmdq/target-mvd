import React from 'react';
import { screen } from '@testing-library/react';

import render from 'utils/testHelpers';
import SignUpPage from '.';

test('SignUpPage renders without crashing', () => {
  const { asFragment } = render(<SignUpPage />);
  expect(asFragment()).toBeDefined();
});

test('SignUpForm shows a title, a from and a sign in link and a form', () => {
  render(<SignUpPage />);

  expect(screen.getByRole('heading', { level: 1, name: /Sign Up/i })).toBeInTheDocument();
  expect(screen.getByRole('form')).toBeInTheDocument();
  expect(screen.getByText(/sign in/i).closest('a')).toHaveAttribute('href', '/login');
});
