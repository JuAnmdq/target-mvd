import React, { memo } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage, useIntl, defineMessages } from 'react-intl';

import { useSession, useDispatch } from 'hooks';
import Layout from 'components/common/Layout';
import LoginForm from 'components/user/LoginForm';
import { ReactComponent as SmiliesIcon } from 'assets/smilies.svg';
import { login } from 'state/actions/userActions';
import routes from 'constants/routesPaths';

import './styles.scss';

const messages = defineMessages({
  title: { id: 'login.title' }
});

const LoginPage = () => {
  const { authenticated } = useSession();
  const intl = useIntl();
  const loginRequest = useDispatch(login);

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <Layout title={intl.formatMessage(messages.title)}>
      <div className="login-page">
        <div className="login-page__logo">
          <SmiliesIcon data-testid="logo" />
        </div>
        <h1>
          <FormattedMessage id="login.headingTitle" />
        </h1>
        <h2>
          <FormattedMessage id="login.subheadingTitle" />
        </h2>
        <div className="login-page__info-wrapper">
          <p>
            <FormattedMessage id="login.info" />
          </p>
        </div>
        <LoginForm onSubmit={loginRequest} />
        <Link to="#" className="login-page__small-link">
          <FormattedMessage id="login.forgot_password" />
        </Link>
        <div className="login-page__footer-actions">
          <Link to="#" className="login-page__social-connect">
            <FormattedMessage id="login.connect_facebook" />
          </Link>
          <hr />
          <Link to={routes.signUp} className="login-page__bottom-link">
            <FormattedMessage id="login.signup" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default memo(LoginPage);
