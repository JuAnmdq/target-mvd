import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import Button from '.';

const DEFAULT_PROPS = {
  children: 'foo',
  onClick: jest.fn()
};

test('Button renders with correct text', () => {
  const { rerender } = render(<Button {...DEFAULT_PROPS} />);
  expect(screen.getByText(DEFAULT_PROPS.children)).toBeInTheDocument();

  // Change props
  rerender(<Button {...DEFAULT_PROPS}>bar</Button>);
  expect(screen.getByText('bar')).toBeInTheDocument();
});

test('Button calls correct onClick callback', () => {
  render(<Button {...DEFAULT_PROPS} />);
  fireEvent.click(screen.getByRole('button'));
  expect(DEFAULT_PROPS.onClick).toHaveBeenCalledTimes(1);
});

test('Button should disabled as expected', () => {
  const props = {
    ...DEFAULT_PROPS,
    disabled: true
  };

  render(<Button {...props} />);

  expect(screen.getByRole('button')).toBeDisabled();
});

test('Button matches its snapshot', () => {
  const { asFragment } = render(<Button {...DEFAULT_PROPS} />);
  expect(asFragment()).toMatchSnapshot();
});
