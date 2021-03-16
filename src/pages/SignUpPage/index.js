import React, { memo } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { useSession, useDispatch } from 'hooks';
import { signUp } from 'state/actions/userActions';
import SignUpForm from 'components/user/SignUpForm';
import routes from 'constants/routesPaths';

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
    <>
      <Helmet>
        <title>{intl.formatMessage(messages.title)}</title>
      </Helmet>
      <div>
        <h1>
          <FormattedMessage id="signup.headingTitle" />
        </h1>
        <SignUpForm onSubmit={signUpRequest} />
        <Link to={routes.login}>
          <FormattedMessage id="signup.signin" />
        </Link>
      </div>
    </>
  );
};

export default memo(SignUpPage);
