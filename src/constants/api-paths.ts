const authPathRoot = 'auth';
const usersPathRoot = 'users';

const authPaths = {
  register: `${authPathRoot}/register`,
  login: `${authPathRoot}/login`,
  logout: `${authPathRoot}/logout`,
  resetPassword: `${authPathRoot}/reset-password-request`,
  recoverPassword: `${authPathRoot}/reset-password`,
  refreshToken: `${authPathRoot}/refresh-token`,
  changePassword: `${authPathRoot}/change-password`,
};

const userPaths = {
  profile: `${usersPathRoot}/me`,
};

export const API_PATHS = {
  ...authPaths,
  ...userPaths,
};
