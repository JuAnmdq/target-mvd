import React from 'react';
import { string, node } from 'prop-types';
import { Helmet } from 'react-helmet';

import { ReactComponent as Hamburguer } from 'assets/hamburguer.svg';
import { ReactComponent as MobileIcon } from 'assets/i6.svg';
import { ReactComponent as AppStoreIcon } from 'assets/appstore-button.svg';
import { ReactComponent as FacebookIcon } from 'assets/facebook.svg';
import { ReactComponent as TwitterIcon } from 'assets/twitter.svg';

import './styles.scss';

const Layout = ({ title, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <div className="layout__wrapper">
      <div className="layout__hamburguer">
        <Hamburguer />
      </div>
      <div className="layout__content flex-container">
        <div className="flex-child">{children}</div>
        <div className="flex-child">
          <MobileIcon height="616px" />
          <div className="layout__app-store">
            <AppStoreIcon />
          </div>
          <div className="layout__socials">
            <div>
              <FacebookIcon />
            </div>
            <div>
              <TwitterIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

Layout.propTypes = {
  title: string.isRequired,
  children: node.isRequired
};

export default Layout;
