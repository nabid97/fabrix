import { Amplify } from 'aws-amplify';

// Configure Amplify
const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      region: process.env.REACT_APP_AWS_REGION,
      userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
      mandatorySignIn: true,
      authenticationFlowType: 'USER_PASSWORD_AUTH',
    }
  });
};

export default configureAmplify;