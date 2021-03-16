import React, { memo } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { useSession, useDispatch } from 'hooks';
import { signUp } from 'state/actions/userActions';
import Layout from 'components/common/Layout';
import SignUpForm from 'components/user/SignUpForm';
import routes from 'constants/routesPaths';

import './styles.scss';

const messages = defineMessages({
  title: { id: 'signup.title' }
});

const SignUpPage = () => {
  const { authenticated } = useSession();
  const intl = useIntl();
  const signUpRequest = useDispatch(signUp);

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <Layout title={intl.formatMessage(messages.title)}>
      <div className="sign-up-page">
        <h1>
          <FormattedMessage id="signup.headingTitle" />
        </h1>
        <SignUpForm onSubmit={signUpRequest} />
        <div className="sign-up-page__footer-actions">
          <hr />
          <Link className="sign-up-page__bottom-link" to={routes.login}>
            <FormattedMessage id="signup.signin" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default memo(SignUpPage);
