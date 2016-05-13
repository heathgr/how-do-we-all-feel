import authData from '../testConstants/authData.js';

const mockFirebase = () => {
  const authWithOAuthRedirect = (provider, callback) => {
    callback(null, authData);
  };
};

export default mockFirebase;
