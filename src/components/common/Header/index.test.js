import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '.';

test('Header renders without crashing', () => {
  const { asFragment } = render(<Header />);
  expect(asFragment).toBeDefined();
});

test('Header shows the expected header title', () => {
  render(<Header />);
  expect(screen.getByRole('heading', { level: 2, name: /header.../i })).toBeInTheDocument();
});
