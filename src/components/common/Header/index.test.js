import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '.';

describe('Header', () => {
  beforeAll(() => {
    render(<Header />);
  });

  test('shows the expected header title', () => {
    expect(screen.getByRole('heading', { level: 2, name: /header.../i })).toBeInTheDocument();
  });
});
