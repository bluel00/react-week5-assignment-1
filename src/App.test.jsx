import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import App from './App';

import restaurants from '../fixtures/restaurants';

import categories from '../fixtures/categories';

import regions from '../fixtures/regions';

jest.mock('react-redux');

test('App', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    restaurants,
    categories,
    regions,
  }));
  const { getByText } = render((
    <App />
  ));

  expect(dispatch).toBeCalledWith({
    type: 'setRegions',
    payload: {
      regions
    }
  });

  expect(dispatch).toBeCalledWith({
    type: 'setCategories',
    payload: {
      categories
    }
  });

  expect(getByText(/서울/)).not.toBeNull();
  expect(getByText(/중식/)).not.toBeNull();
  expect(getByText(/홍콩반점/)).not.toBeNull();
});
