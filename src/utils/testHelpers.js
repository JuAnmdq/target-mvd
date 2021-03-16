import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import locales from 'locales';
import reducer from 'state/reducers';

const messages = locales.en;

export const withStore = (WrappedComponent /* , store */) => (
  <MemoryRouter>
    <IntlProvider locale="en" messages={messages}>
      <Provider store={createStore(reducer, {})}>{WrappedComponent}</Provider>
    </IntlProvider>
  </MemoryRouter>
);
