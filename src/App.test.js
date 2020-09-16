import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';



import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
